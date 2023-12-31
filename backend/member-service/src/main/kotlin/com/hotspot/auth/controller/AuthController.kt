package com.hotspot.auth.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.global.oauth.dto.OAuthLoginReqDto
import com.hotspot.global.oauth.service.OAuthServiceFactory
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(
    private val oAuthServiceFactory: OAuthServiceFactory,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
) {

    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                .process(oAuthLoginReqDto.accessToken)
        )
    }
}