package com.hotspot.visitor.service;

import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.repository.HotPlaceRepository;
import com.hotspot.visitor.dto.VisitorResDto;
import com.hotspot.visitor.entity.Visitor;
import com.hotspot.visitor.mapper.VisitorMapper;
import com.hotspot.visitor.repository.VisitorRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class VisitorService {

    private final VisitorRepository visitorRepository;
    private final HotPlaceRepository hotPlaceRepository;

    public List<VisitorResDto> findAllVisitor(Long hotPlaceId) {
        List<Visitor> visitorList = visitorRepository.findVisitorsByHotPlaceId(hotPlaceId);
        List<VisitorResDto> visitorResDtoList = new ArrayList<>();
        for (Visitor visitor : visitorList) {
            VisitorResDto visitorResDto = VisitorMapper.INSTANCE.entityToVisitorResDto(visitor);
            visitorResDtoList.add(visitorResDto);
        }

        return visitorResDtoList;
    }
}
