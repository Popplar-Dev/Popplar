package com.hotspot.hotplace.controller;


import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.hotplace.dto.HotPlaceReqDto;
import com.hotspot.hotplace.entity.MemberPosition;
import com.hotspot.hotplace.service.HotPlaceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/hot-place")
@Slf4j
public class HotPlaceController {

    private final HotPlaceService hotPlaceService;

    @GetMapping
    public ResponseEntity<List<HotPlaceResDto>> findAllHotPlace(
        @RequestHeader("Member-Id") Long memberId) {
        List<HotPlaceResDto> hotPlaceDtolist = hotPlaceService.findAllHotPlace(memberId);

        return new ResponseEntity<>(hotPlaceDtolist, HttpStatus.OK);
    }

    @GetMapping("/{hotPlaceId}")
    public ResponseEntity<HotPlaceResDto> findHotPlace(@RequestHeader("Member-Id") Long memberId,
        @PathVariable Long hotPlaceId) {
        HotPlaceResDto hotPlaceResDto = hotPlaceService.findHotPlace(hotPlaceId, memberId);

        return new ResponseEntity<>(hotPlaceResDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<HotPlaceResDto> insertHotPlace(@RequestHeader("Member-Id") Long memberId,
        @RequestBody HotPlaceReqDto hotPlaceReqDto) {
        HotPlaceResDto hotPlaceResDto = hotPlaceService.insertHotPlace(hotPlaceReqDto, memberId);

        return new ResponseEntity<>(hotPlaceResDto, HttpStatus.OK);
    }

    @PostMapping("/{hotPlaceId}/like")
    public ResponseEntity<Void> likeHotPlace(@RequestHeader("Member-Id") Long memberId,
        @PathVariable Long hotPlaceId) {
        hotPlaceService.likeHotPlace(hotPlaceId, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{hotPlaceId}/like")
    public ResponseEntity<Void> deleteLikeHotPlace(@RequestHeader("Member-Id") Long memberId,
        @PathVariable Long hotPlaceId) {
        hotPlaceService.deleteLikeHotPlace(hotPlaceId, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/position")
    public ResponseEntity<Void> insertMemberPosition(@RequestHeader("Member-Id") Long memberId,
        @RequestBody MemberPosition memberPosition) {
        memberPosition.setMemberId(memberId);
        hotPlaceService.insertMemberPosition(memberPosition);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("{hotPlaceId}/position")
    public ResponseEntity<List<MemberPosition>> findAllMemberPosition(
        @PathVariable Long hotPlaceId) {

        return new ResponseEntity<>(hotPlaceService.findAllMemberPosition(
            hotPlaceId), HttpStatus.OK);
    }
}
