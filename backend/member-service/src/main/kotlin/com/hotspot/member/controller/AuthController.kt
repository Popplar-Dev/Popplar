package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.global.oauth.dto.OAuthLoginReqDto
import com.hotspot.global.oauth.service.OAuthServiceFactory
import com.hotspot.member.service.CryptService
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(
        private val oAuthServiceFactory: OAuthServiceFactory,
        private val memberProfileResDtoRA: MemberProfileResDtoRA,
        private val cryptService: CryptService,
) {
    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        // TODO JWT 생성 로직 추가 필요
        return memberProfileResDtoRA.toModel(
                oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                        .process(cryptService, oAuthLoginReqDto.accessToken)
        )
    }
}