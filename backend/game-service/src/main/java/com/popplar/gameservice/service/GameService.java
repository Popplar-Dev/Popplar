package com.popplar.gameservice.service;

import com.popplar.gameservice.dto.BoardDto;
import com.popplar.gameservice.dto.ConquerorInfoDto;
import com.popplar.gameservice.dto.GameBoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.dto.MyBoardDto;
import com.popplar.gameservice.entity.Conqueror;
import com.popplar.gameservice.entity.Game;
import com.popplar.gameservice.entity.GameType;
import com.popplar.gameservice.mapper.ConquerorMapper;
import com.popplar.gameservice.mapper.GameMapper;
import com.popplar.gameservice.repository.ConquerorRepository;
import com.popplar.gameservice.repository.GameQueryDSLRepository;
import com.popplar.gameservice.repository.GameRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final GameQueryDSLRepository gameQueryDSLRepository;
    private final ConquerorRepository conquerorRepository;


    @Transactional
    public GameResultDto insertGameService(GameDto gameDto) {
        //데이터를 entity로 변환해서 save한다
        Game game = GameMapper.INSTANCE.gameDtoToGame(gameDto);
        gameRepository.save(game);
        //정복자가 없다면,
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDate currentDate = currentDateTime.toLocalDate();
        LocalDateTime startOfDay = currentDate.atStartOfDay();
        LocalDateTime endOfDay = currentDate.atTime(LocalTime.MAX);
        Optional<Conqueror> conqueror = conquerorRepository.findTopByHotPlaceIdAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
            game.getHotPlaceId(), startOfDay, endOfDay);
        if (conqueror.isEmpty()) {
            //내가 무조건 정복자
            Conqueror newConqueror = conquerorRepository.save(
                GameMapper.INSTANCE.gameToConqueror(game));
            newConqueror.setPoints(sumAllGamePoint(game));
            return GameResultDto.builder().isConqueror(true)
                .points(newConqueror.getPoints()).createdTime(newConqueror.getCreatedDate())
                .build();
        }
        //정복자가 있고 정복자보다 내가 더 높으면 정복자로 등록하고 정복자 등록 이벤트를 발동
        //게임모드 종합해서
        if (sumAllGamePoint(game) > conqueror.orElseThrow().getPoints()) {
            Conqueror newConqueror = conquerorRepository.save(
                GameMapper.INSTANCE.gameToConqueror(game));
            newConqueror.setPoints(sumAllGamePoint(game));
            //기존 정복자 정보는 삭제
            conqueror.orElseThrow().setDeleted();
            return GameResultDto.builder().isConqueror(true).points(newConqueror.getPoints())
                .createdTime(newConqueror.getCreatedDate())
                .build();
        }
        return GameResultDto.builder().isConqueror(false).points(game.getPoints()).build();
    }

    public int sumAllGamePoint(Game game) {
        int sum = 0;
        List<GameType> typeList = List.of(GameType.values());

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDate currentDate = currentDateTime.toLocalDate();
        LocalDateTime startOfDay = currentDate.atStartOfDay();
        LocalDateTime endOfDay = currentDate.atTime(LocalTime.MAX);

        //전체 게임리스트에 대해서 삭제되지 않은 기록중 나의 최고 기록들을 더해 반환하게끔한다.
        for (GameType type : typeList) {

            int temp = gameRepository.findTopByMemberIdAndTypeAndDeletedFalseAndCreatedDateBetween(
                    game.getMemberId(), type, startOfDay, endOfDay)
                .orElse(Game.builder().points(0).build()).getPoints();

            if (type.equals(game.getType()) && temp < game.getPoints()) {
                sum += game.getPoints();
                continue;
            }
            sum += temp;
        }
        return sum;
    }

    public GameBoardDto getGameBoard(Long hotPlaceId, String type) {
        // hotPlaceId에 해당하는 게임 정보를 조회
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDate currentDate = currentDateTime.toLocalDate();
        LocalDateTime startOfDay = currentDate.atStartOfDay();
        LocalDateTime endOfDay = currentDate.atTime(LocalTime.MAX);

        List<BoardDto> boardDtoList = gameQueryDSLRepository.findMaxPointsByHotPlaceIdAndType(
            hotPlaceId, type, startOfDay, endOfDay);
        return GameBoardDto.builder().boardDtoList(boardDtoList).build();
    }

    public MyBoardDto getMyGameBoard(Long memberId, Long hotPlaceId, String type) {
        List<Game> gameList = gameRepository.findByHotPlaceIdAndTypeAndMemberIdAndDeletedFalseOrderByPointsDesc(
            hotPlaceId,
            GameType.valueOf(type), memberId);
        return MyBoardDto.builder()
            .gameDtoList(gameList.stream().map(GameMapper.INSTANCE::gameToGameDto).toList())
            .build();
    }

    public ConquerorInfoDto getConquerorInfo(Long hotPlaceId) {
        //해당 지역에 포인트가 가장 큰 녀석에 대한 정보를 conqurerorInfo에 담아 반환한다.
        //아직 없으면 id에 0을 담아 반환한다.
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDate currentDate = currentDateTime.toLocalDate();
        LocalDateTime startOfDay = currentDate.atStartOfDay();
        LocalDateTime endOfDay = currentDate.atTime(LocalTime.MAX);

        return conquerorRepository.findTopByHotPlaceIdAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
                hotPlaceId, startOfDay, endOfDay)
            .map(ConquerorMapper.INSTANCE::conquerorToConquerorInfoDto)
            .orElseGet(() -> ConquerorInfoDto.builder().id(0L).build());
    }
}
