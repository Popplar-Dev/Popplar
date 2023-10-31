package com.popplar.gameservice.mapper;

import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.entity.Conqueror;
import com.popplar.gameservice.entity.Game;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GameMapper {

    GameMapper INSTANCE = Mappers.getMapper(GameMapper.class);

    Game gameDtoToGame(GameDto gameDto);

    Conqueror gameToConqueror(Game game);

}
