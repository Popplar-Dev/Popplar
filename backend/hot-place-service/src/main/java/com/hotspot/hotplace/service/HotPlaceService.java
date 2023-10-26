package com.hotspot.hotplace.service;

import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.hotplace.dto.HotPlaceReqDto;
import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.entity.HotPlaceType;
import com.hotspot.hotplace.entity.Like;
import com.hotspot.hotplace.mapper.HotPlaceMapper;
import com.hotspot.hotplace.repository.HotPlaceRepository;
import com.hotspot.hotplace.repository.LikeRepository;
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
    private final LikeRepository likeRepository;

    public List<HotPlaceResDto> findAllHotPlace() {
        List<HotPlace> hotPlaceList = hotPlaceRepository.findAll();
        List<HotPlaceResDto> hotPlaceResDtoList = new ArrayList<>();
        for (HotPlace hotPlace : hotPlaceList) {
            HotPlaceResDto hotPlaceResDto = HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(
                hotPlace);
            hotPlaceResDtoList.add(hotPlaceResDto);
        }

        return hotPlaceResDtoList;
    }

    public HotPlaceResDto findHotPlace(Long hotPlaceId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);

        return HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(hotPlace);
    }

    @Transactional
    public HotPlaceResDto insertHotPlace(HotPlaceReqDto hotPlaceReqDto) {
        if (hotPlaceRepository.findById(hotPlaceReqDto.getId()).isPresent()) {
            throw new ArithmeticException("이미 핫플레이스로 등록되어있습니다.");
        }
        HotPlace hotPlace = HotPlaceMapper.INSTANCE.hotPlaceReqDtoToEntity(hotPlaceReqDto);
        hotPlaceRepository.save(hotPlace);

        return HotPlaceMapper.INSTANCE.entityToHotPlaceResDto(hotPlace);
    }

    @Transactional
    public void likeHotPlace(Long hotPlaceId, Long memberId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);
        if (likeRepository.findByHotPlaceAndMemberId(hotPlace, memberId).isPresent()) {
            throw new RuntimeException("이미 좋아요 누른 핫플레이스입니다.");
        }
        likeRepository.save(Like.builder().memberId(memberId).hotPlace(hotPlace).build());
        hotPlace.increaseLikeCount();
        if (hotPlace.getLikeCount() >= 5) {
            hotPlace.upgrade(HotPlaceType.HOT_PLACE);
        }
    }

    @Transactional
    public void deleteLikeHotPlace(Long hotPlaceId, Long memberId) {
        HotPlace hotPlace = findHotPlaceById(hotPlaceId);
        Like like = likeRepository.findByHotPlaceAndMemberId(hotPlace, memberId)
            .orElseThrow(() -> new ArithmeticException("좋아요를 하지 않은 핫플레이스입니다."));
        likeRepository.delete(like);
        hotPlace.decreaseLikeCount();
    }

    // -- 예외 처리용 코드 -- //
    public HotPlace findHotPlaceById(Long hotPlaceId) {
        return hotPlaceRepository.findById(hotPlaceId)
            .orElseThrow(() -> new ArithmeticException("핫플레이스가 존재하지 않습니다"));
    }

}
