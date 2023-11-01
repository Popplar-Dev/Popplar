package com.popplar.gameservice.mapper;

import com.popplar.gameservice.dto.ConquerorInfoDto;
import com.popplar.gameservice.entity.Conqueror;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ConquerorMapper {

    ConquerorMapper INSTANCE = Mappers.getMapper(ConquerorMapper.class);

    ConquerorInfoDto conquerorToConquerorInfoDto(Conqueror conqueror);
}
