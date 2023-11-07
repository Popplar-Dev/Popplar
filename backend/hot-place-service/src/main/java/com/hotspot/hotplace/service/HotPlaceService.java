package com.hotspot.hotplace.service;

import com.hotspot.global.exception.exceptions.BadRequestException;
import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.hotplace.dto.HotPlaceReqDto;
import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.entity.HotPlaceType;
import com.hotspot.hotplace.entity.Like;
import com.hotspot.hotplace.entity.MemberPosition;
import com.hotspot.hotplace.mapper.HotPlaceMapper;
import com.hotspot.hotplace.repository.HotPlaceRepository;
import com.hotspot.hotplace.repository.LikeRepository;
import com.hotspot.hotplace.repository.MemberPositionRepository;
import com.hotspot.visitor.repository.VisitorRepository;
import java.time.Duration;
import java.time.LocalDateTime;
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

    private final VisitorRepository visitorRepository;
    private final HotPlaceRepository hotPlaceRepository;
    private final LikeRepository likeRepository;
    private final MemberPositionRepository memberPositionRepository;

    public List<HotPlaceResDto> findAllHotPlace() {
        List<HotPlace> hotPlaceList = hotPlaceRepository.findAll();
        List<HotPlaceResDto> hotPlaceResDtoList = new ArrayList<>();
        for (HotPlace hotPlace : hotPlaceList) {
            HotPlaceResDto hotPlaceResDto = HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(
                hotPlace);
            hotPlaceResDto = updateDto(hotPlaceResDto, hotPlace);
            hotPlaceResDtoList.add(hotPlaceResDto);
        }

        return hotPlaceResDtoList;
    }

    public HotPlaceResDto findHotPlace(Long hotPlaceId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);
        HotPlaceResDto hotPlaceResDto = HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(hotPlace);
        hotPlaceResDto = updateDto(hotPlaceResDto, hotPlace);

        return hotPlaceResDto;
    }

    @Transactional
    public HotPlaceResDto insertHotPlace(HotPlaceReqDto hotPlaceReqDto) {
        if (hotPlaceRepository.findById(hotPlaceReqDto.getId()).isPresent()) {
            throw new BadRequestException("이미 핫플레이스로 등록되어있습니다.");
        }

        // 카테고리 기타 처리
        String category = hotPlaceReqDto.getCategory();
        hotPlaceReqDto.setCategory(checkCategory(category));

        HotPlace hotPlace = HotPlaceMapper.INSTANCE.hotPlaceReqDtoToEntity(hotPlaceReqDto);
        hotPlace.updatePlaceType(HotPlaceType.FLAG);
        hotPlaceRepository.save(hotPlace);

        HotPlaceResDto hotPlaceResDto = HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(hotPlace);
        hotPlaceResDto = updateDto(hotPlaceResDto, hotPlace);

        return hotPlaceResDto;
    }

    @Transactional
    public void likeHotPlace(Long hotPlaceId, Long memberId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);
        if (likeRepository.findByHotPlaceAndMemberId(hotPlace, memberId).isPresent()) {
            throw new BadRequestException("이미 좋아요 누른 핫플레이스입니다.");
        }
        hotPlace.increaseLikeCount();
        if (hotPlace.getLikeCount() >= 5) {
            hotPlace.updatePlaceType(HotPlaceType.HOT_PLACE);
        }
        likeRepository.save(Like.builder().memberId(memberId).hotPlace(hotPlace).build());
    }

    @Transactional
    public void deleteLikeHotPlace(Long hotPlaceId, Long memberId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);
        Like like = likeRepository.findByHotPlaceAndMemberId(hotPlace, memberId)
            .orElseThrow(() -> new BadRequestException("좋아요를 하지 않은 핫플레이스입니다."));
        likeRepository.delete(like);
        hotPlace.decreaseLikeCount();
    }


    //레디스 관련 로직
    public void insertMemberPosition(MemberPosition memberPosition) {
        MemberPosition memberPos = memberPositionRepository.findByMemberId(
            memberPosition.getMemberId());
        if (memberPos != null) {
            memberPos.memberUpdate(memberPosition);
            memberPositionRepository.save(memberPos);
            return;
        }
        memberPositionRepository.save(memberPosition);
    }

    public List<MemberPosition> findAllMemberPosition(Long hotPlaceId) {
        return memberPositionRepository.findAllByHotPlaceId(
            hotPlaceId);
    }

    // -- 예외 처리용 코드 -- //
    public HotPlace findHotPlaceById(Long hotPlaceId) {
        return hotPlaceRepository.findById(hotPlaceId)
            .orElseThrow(() -> new BadRequestException("핫플레이스가 존재하지 않습니다"));
    }

    // -- 기타 카테고리 처리용 코드 -- //
    public String checkCategory(String category) {
        ArrayList<String> categoryList = new ArrayList<>(
            List.of("학교", "문화시설", "관광명소", "음식점", "카페"));

        if (categoryList.contains(category)) {
            return category;
        } else {
            return "기타";
        }
    }

    // -- DTO 필드 추가 -- //
    public HotPlaceResDto updateDto(HotPlaceResDto hotPlaceResDto, HotPlace hotPlace) {
        // 2주간 사용자 방문 횟수 체크
        int twoWeeksVisitorCount = visitorRepository.countByVisitedDateAfterAndHotPlaceId(
            LocalDateTime.now().minus(
                Duration.ofDays(14)), hotPlace.getId());
        hotPlaceResDto.setVisitorCount(twoWeeksVisitorCount);
        // 핫플 랭크 생성
        hotPlaceResDto.setRank(checkRank(twoWeeksVisitorCount, hotPlace.getPlaceType()));

        return hotPlaceResDto;
    }

    // -- 핫플레이스 랭크 체크용 코드 -- //
    public int checkRank(int count, HotPlaceType type) {
        if (type == HotPlaceType.FLAG) {
            return 0;
        }

        if (count < 10) {
            return 5;
        } else if (count < 50) {
            return 4;
        } else if (count < 100) {
            return 3;
        } else if (count < 500) {
            return 2;
        } else {
            return 1;
        }
    }
}

