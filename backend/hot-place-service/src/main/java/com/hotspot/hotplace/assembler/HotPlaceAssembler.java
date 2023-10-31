package com.hotspot.hotplace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.hotspot.hotplace.controller.HotPlaceController;
import com.hotspot.hotplace.dto.HotPlaceResDto;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class HotPlaceAssembler {

    public EntityModel<HotPlaceResDto> findHotPlaceToModel(HotPlaceResDto hotPlaceResDto) {
        return EntityModel.of(hotPlaceResDto, linkTo(
            methodOn(HotPlaceController.class).findHotPlace(hotPlaceResDto.getId())).withRel(
            "findById"));
    }

    public EntityModel<?> likeHotPlaceToModel(Long hotPlaceId) {
        return EntityModel.of(
            new ResponseEntity<Void>(HttpStatus.OK),
            linkTo(methodOn(HotPlaceController.class).likeHotPlace(hotPlaceId)).withRel("like"),
            linkTo(methodOn(HotPlaceController.class).deleteLikeHotPlace(hotPlaceId)).withRel(
                "deleteLike"));
    }
}
