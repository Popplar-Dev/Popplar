package com.hotspot.hotplace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.hotspot.hotplace.controller.HotPlaceController;
import com.hotspot.hotplace.dto.HotPlaceDto;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;

@Component
public class HotPlaceAssembler {

    public EntityModel<HotPlaceDto> findHotPlaceToModel(HotPlaceDto hotPlaceDto) {
        return EntityModel.of(hotPlaceDto, linkTo(
            methodOn(HotPlaceController.class).findHotPlace(hotPlaceDto.getId())).withSelfRel());
    }

    public EntityModel<?> likeHotPlaceToModel(Long hotPlaceId) {
        return EntityModel.of(
            linkTo(methodOn(HotPlaceController.class).likeHotPlace(hotPlaceId)).withRel("like"),
            linkTo(methodOn(HotPlaceController.class).deleteLikeHotPlace(hotPlaceId)).withRel("deleteLike"));
    }
}
