package com.popplar.gameservice.service;

import com.popplar.gameservice.dto.ConquerorInfoDto;
import com.popplar.gameservice.dto.GameBoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.entity.Conqueror;
import com.popplar.gameservice.entity.Game;
import com.popplar.gameservice.entity.GameType;
import com.popplar.gameservice.mapper.ConquerorMapper;
import com.popplar.gameservice.mapper.GameMapper;
import com.popplar.gameservice.repository.ConquerorRepository;
import com.popplar.gameservice.repository.GameQueryDSLRepository;
import com.popplar.gameservice.repository.GameRepository;
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
        System.out.println(game.toString());
        gameRepository.save(game);
        //정복자가 없다면,
        Optional<Conqueror> conqueror = conquerorRepository.findTopByHotPlaceIdAndDeletedFalseOrderByPointsDesc(
            game.getHotPlaceId());
        if (conqueror.isEmpty()) {
            //내가 무조건 정복자
            conquerorRepository.save(conqueror.orElseThrow());
            return GameResultDto.builder().isConqueror(true)
                .points(conqueror.orElseThrow().getPoints()).build();
        }
        //정복자가 있고 정복자보다 내가 더 높으면 정복자로 등록하고 정복자 등록 이벤트를 발동
        if (game.getPoints() > conqueror.orElseThrow().getPoints()) {
            Conqueror newConqueror = GameMapper.INSTANCE.gameToConqueror(game);
            conquerorRepository.save(newConqueror);
            //기존 정복자 정보는 삭제
            conqueror.orElseThrow().setDeleted();
            return GameResultDto.builder().isConqueror(true).points(newConqueror.getPoints())
                .build();
        }
        return GameResultDto.builder().isConqueror(false).points(game.getPoints()).build();
    }

    public GameBoardDto getGameBoard(Long hotPlaceId, String type) {
        // hotPlaceId에 해당하는 게임 정보를 조회
        List<GameDto> gameDtoList = gameQueryDSLRepository.findMaxPointsByHotPlaceIdAndType(
            hotPlaceId,
            type);
        return GameBoardDto.builder().gameDtoList(gameDtoList).build();
    }

    public GameBoardDto getMyGameBoard(Long memberId, Long hotPlaceId, String type) {
        List<GameDto> gameDtoList = gameRepository.findByHotPlaceIdAndTypeAndMemberIdAndDeletedFalseOrderByPointsDesc(hotPlaceId,
            GameType.valueOf(type), memberId);
        return GameBoardDto.builder().gameDtoList(gameDtoList).build();
    }

    public ConquerorInfoDto getConquerorInfo(Long hotPlaceId) {
        //해당 지역에 포인트가 가장 큰 녀석에 대한 정보를 conqurerorInfo에 담아 반환한다.
        //아직 없으면 id에 0을 담아 반환한다.
        return conquerorRepository.findTopByHotPlaceIdAndDeletedFalseOrderByPointsDesc(hotPlaceId)
            .map(ConquerorMapper.INSTANCE::conquerorToConquerorInfoDto)
            .orElseGet(() -> ConquerorInfoDto.builder().id(0L).build());
    }
}
