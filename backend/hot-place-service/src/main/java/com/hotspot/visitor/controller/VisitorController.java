package com.hotspot.visitor.controller;

import com.hotspot.hotplace.dto.HotPlaceResDto;
import com.hotspot.visitor.dto.VisitorReqDto;
import com.hotspot.visitor.dto.VisitorResDto;
import com.hotspot.visitor.service.VisitorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
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
public class VisitorController {

    private final VisitorService visitorService;

    @GetMapping("/visitor/{hotPlaceId}")
    public CollectionModel<EntityModel<VisitorResDto>> findAllVisitor(
        @PathVariable Long hotPlaceId) {
        List<EntityModel<VisitorResDto>> visitorModelList = visitorService.findAllVisitor(
                hotPlaceId)
            .stream()
            .map(EntityModel::of)
            .toList();

        return CollectionModel.of(visitorModelList);
    }

    @PostMapping("/visitor")
    public EntityModel<HotPlaceResDto> insertVisitor(@RequestBody VisitorReqDto visitorReqDto) {
        HotPlaceResDto hotPlaceResDto = visitorService.insertVisitor(visitorReqDto);

        return EntityModel.of(hotPlaceResDto);
    }
}
