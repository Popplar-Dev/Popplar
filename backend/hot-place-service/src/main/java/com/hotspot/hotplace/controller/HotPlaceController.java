package com.hotspot.hotplace.controller;


import com.hotspot.hotplace.assembler.HotPlaceAssembler;
import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.hotplace.dto.HotPlaceReqDto;
import com.hotspot.hotplace.service.HotPlaceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/hot-place")
@Slf4j
public class HotPlaceController {

    private final HotPlaceService hotPlaceService;
    private final HotPlaceAssembler hotPlaceAssembler;

    @GetMapping
    public CollectionModel<EntityModel<HotPlaceResDto>> findAllHotPlace() {
        List<EntityModel<HotPlaceResDto>> hotPlaceDtolist = hotPlaceService.findAllHotPlace()
            .stream()
            .map(hotPlaceAssembler::findHotPlaceToModel)
            .toList();

        return CollectionModel.of(hotPlaceDtolist);
    }

    @GetMapping("/{hotPlaceId}")
    public EntityModel<HotPlaceResDto> findHotPlace(@PathVariable Long hotPlaceId) {
        HotPlaceResDto hotPlaceResDto = hotPlaceService.findHotPlace(hotPlaceId);

        return hotPlaceAssembler.findHotPlaceToModel(hotPlaceResDto);
    }

    @PostMapping
    public EntityModel<HotPlaceResDto> insertHotPlace(@RequestBody HotPlaceReqDto hotPlaceReqDto) {
        HotPlaceResDto hotPlaceResDto = hotPlaceService.insertHotPlace(hotPlaceReqDto);

        return hotPlaceAssembler.findHotPlaceToModel(hotPlaceResDto);
    }


    @PostMapping("/{hotPlaceId}/like")
    public EntityModel<?> likeHotPlace(@PathVariable Long hotPlaceId) {
        // TODO 임시 memberId
        Long memberId = 1L;
        hotPlaceService.likeHotPlace(hotPlaceId, memberId);

        return hotPlaceAssembler.likeHotPlaceToModel(hotPlaceId);
    }

    @DeleteMapping("/{hotPlaceId}/like")
    public EntityModel<?> deleteLikeHotPlace(@PathVariable Long hotPlaceId) {
        // TODO 임시 memberId
        Long memberId = 1L;
        hotPlaceService.deleteLikeHotPlace(hotPlaceId, memberId);

        return hotPlaceAssembler.likeHotPlaceToModel(hotPlaceId);
    }
}
