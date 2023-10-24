package com.hotspot.hotplace.mapper;

import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.hotplace.dto.HotPlaceReqDto;
import com.hotspot.hotplace.entity.HotPlace;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HotPlaceMapper {
    HotPlaceMapper INSTANCE = Mappers.getMapper(HotPlaceMapper.class);

    HotPlaceResDto entityToHotPlaceResDto(HotPlace hotPlace);

    HotPlace hotPlaceReqDtoToEntity(HotPlaceReqDto hotPlaceReqDto);
}
