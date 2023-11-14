package com.hotspot.visitor.service;

import com.hotspot.global.exception.exceptions.BadRequestException;
import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.repository.HotPlaceRepository;
import com.hotspot.visitor.dto.VisitorReqDto;
import com.hotspot.visitor.dto.VisitorResDto;
import com.hotspot.visitor.entity.Visitor;
import com.hotspot.visitor.mapper.VisitorMapper;
import com.hotspot.visitor.repository.VisitorRepository;
import java.time.LocalDate;
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

    @Transactional
    public void insertVisitor(VisitorReqDto visitorReqDto, Long memberId) {
        Long hotPlaceId = visitorReqDto.getHotPlaceId();
        LocalDate visitedDate = LocalDate.now();

        // 이미 오늘 방문했다면 아무것도 처리하지 않고 return
        if (visitorRepository.findVistorsByMemberIdAndHotPlaceIdAndVisitedDate(memberId, hotPlaceId,
            visitedDate).isPresent()) {
            return;
        }

        visitorReqDto.setMemberId(memberId);
        visitorReqDto.setVisitedDate(visitedDate);
        Visitor visitor = VisitorMapper.INSTANCE.VisitorReqDtoToEntity(visitorReqDto);
        HotPlace hotPlace = hotPlaceRepository.findById(hotPlaceId)
            .orElseThrow(() -> new BadRequestException("핫플레이스가 존재하지 않습니다."));
        visitor.updateHotPlace(hotPlace);
        visitorRepository.save(visitor);
    }
}
