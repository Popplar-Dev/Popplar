package com.hotspot.hotplace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import com.hotspot.hotplace.controller.HotPlaceController;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class HotPlaceAssembler {

//    public EntityModel<HotPlaceResDto> findHotPlaceToModel(HotPlaceResDto hotPlaceResDto) {
//        return EntityModel.of(hotPlaceResDto, linkTo(
//            methodOn(HotPlaceController.class).findHotPlace(hotPlaceResDto.getId())).withRel(
//            "findById"));
//    }

    public EntityModel<?> likeHotPlaceToModel(Long memberId, Long hotPlaceId) {
        return EntityModel.of(
            new ResponseEntity<Void>(HttpStatus.OK),
            linkTo(methodOn(HotPlaceController.class).likeHotPlace(memberId, hotPlaceId)).withRel("like"),
            linkTo(methodOn(HotPlaceController.class).deleteLikeHotPlace(memberId, hotPlaceId)).withRel(
                "deleteLike"));
    }
}
