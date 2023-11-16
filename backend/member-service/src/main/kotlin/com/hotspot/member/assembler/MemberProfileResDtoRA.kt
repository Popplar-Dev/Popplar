package com.hotspot.member.assembler

import com.hotspot.member.controller.MemberController
import com.hotspot.member.dto.MemberProfileResDto
import org.springframework.hateoas.EntityModel
import org.springframework.hateoas.server.RepresentationModelAssembler
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*
import org.springframework.stereotype.Component

@Component
class MemberProfileResDtoRA :
    RepresentationModelAssembler<MemberProfileResDto, EntityModel<MemberProfileResDto>> {
    override fun toModel(memberProfileResDto: MemberProfileResDto): EntityModel<MemberProfileResDto> {
        val memberMethod = methodOn(MemberController::class.java)
        return EntityModel.of(
            memberProfileResDto,
            linkTo(memberMethod.getMemberProfile(memberProfileResDto.id)).withRel("select-event"),
            linkTo(memberMethod).withRel("update-event"),
            linkTo(memberMethod).withRel("delete-event")
        )
    }
}