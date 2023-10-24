package com.hotspot.hotplace.service;

import com.hotspot.hotplace.dto.HotPlaceDto;
import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.mapper.HotPlaceMapper;
import com.hotspot.hotplace.repository.HotPlaceRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HotPlaceService {

    private final HotPlaceRepository hotPlaceRepository;

    public List<HotPlaceDto> findAllHotPlace() {
        List<HotPlace> hotPlaceList = hotPlaceRepository.findAll();
        List<HotPlaceDto> hotPlaceDtoList = new ArrayList<>();
        for (HotPlace hotPlace : hotPlaceList) {
            HotPlaceDto hotPlaceDto = HotPlaceMapper.INSTANCE.entityToHotPlaceDto(hotPlace);
            hotPlaceDtoList.add(hotPlaceDto);
        }

        return hotPlaceDtoList;
    }

    public HotPlaceDto findHotPlaceById(Long hotPlaceId) {
        HotPlace hotPlace = hotPlaceRepository.findById(hotPlaceId).orElseThrow(() -> new RuntimeException());

        return HotPlaceMapper.INSTANCE.entityToHotPlaceDto(hotPlace);
    }


}
