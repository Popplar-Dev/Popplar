package com.hotspot.hotplace.controller;

import com.hotspot.hotplace.assembler.HotPlaceAssembler;
import com.hotspot.hotplace.dto.HotPlaceDto;
import com.hotspot.hotplace.service.HotPlaceService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public CollectionModel<EntityModel<HotPlaceDto>> findAllHotPlace() {
        List<EntityModel<HotPlaceDto>> hotPlaceDtolist = hotPlaceService.findAllHotPlace().stream()
            .map(hotPlaceAssembler::toModel)
            .collect(Collectors.toList());

        return CollectionModel.of(hotPlaceDtolist);
    }

    @GetMapping("/{hotPlaceId}")
    public EntityModel<HotPlaceDto> findHotPlace(@PathVariable Long hotPlaceId) {
        HotPlaceDto hotPlaceDto = hotPlaceService.findHotPlaceById(hotPlaceId);

        return hotPlaceAssembler.toModel(hotPlaceDto);
    }
}
