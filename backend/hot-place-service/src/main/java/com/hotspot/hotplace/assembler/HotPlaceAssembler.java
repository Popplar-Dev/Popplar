package com.hotspot.hotplace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.hotspot.hotplace.controller.HotPlaceController;
import com.hotspot.hotplace.dto.HotPlaceDto;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
public class HotPlaceAssembler implements
    RepresentationModelAssembler<HotPlaceDto, EntityModel<HotPlaceDto>> {

    @Override
    public EntityModel<HotPlaceDto> toModel(HotPlaceDto hotPlaceDto) {
        return EntityModel.of(hotPlaceDto, linkTo(
            methodOn(HotPlaceController.class).findHotPlace(hotPlaceDto.getId())).withSelfRel());
    }
}
