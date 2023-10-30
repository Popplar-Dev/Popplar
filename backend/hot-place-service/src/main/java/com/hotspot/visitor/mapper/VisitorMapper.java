package com.hotspot.visitor.mapper;

import com.hotspot.visitor.dto.VisitorResDto;
import com.hotspot.visitor.entity.Visitor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VisitorMapper {

    VisitorMapper INSTANCE = Mappers.getMapper(VisitorMapper.class);

    @Mapping(target = "hotPlaceId", source = "hotPlace.id")
    VisitorResDto entityToVisitorResDto(Visitor visitor);
}
