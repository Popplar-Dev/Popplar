package com.popplar.gameservice.service;

import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.entity.Conqueror;
import com.popplar.gameservice.entity.Game;
import com.popplar.gameservice.mapper.GameMapper;
import com.popplar.gameservice.repository.ConquerorRepository;
import com.popplar.gameservice.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final ConquerorRepository conquerorRepository;


    @Transactional
    public GameResultDto insertGameService(GameDto gameDto) {

        //데이터를 entity로 변환해서 save한다
        Game game = GameMapper.INSTANCE.gameDtoToGame(gameDto);
        System.out.println(game.toString());
        gameRepository.save(game);
        //정복자가 없다면,
        Conqueror conqueror = conquerorRepository.findByHotPlaceId(game.getHotPlaceId());
        if (conqueror == null) {
            //내가 무조건 정복자
            conqueror = GameMapper.INSTANCE.gameToConqueror(game);
            conquerorRepository.save(conqueror);
            return GameResultDto.builder().isConqueror(true).point(conqueror.getPoint()).build();
        }
        //정복자가 있고 정복자보다 내가 더 높으면 정복자로 등록하고 정복자 등록 이벤트를 발동
        if (game.getPoint() > conqueror.getPoint()) {
            conqueror = GameMapper.INSTANCE.gameToConqueror(game);
            return GameResultDto.builder().isConqueror(true).point(conqueror.getPoint()).build();
        }
        return GameResultDto.builder().isConqueror(false).point(game.getPoint()).build();
    }
}
