package com.hotspot.hotplace.mapper;

import com.hotspot.hotplace.dto.HotPlaceDto;
import com.hotspot.hotplace.entity.HotPlace;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HotPlaceMapper {
    HotPlaceMapper INSTANCE = Mappers.getMapper(HotPlaceMapper.class);

    HotPlaceDto entityToHotPlaceDto(HotPlace hotPlace);
}
