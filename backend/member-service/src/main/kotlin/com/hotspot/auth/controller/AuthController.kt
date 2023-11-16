package com.hotspot.auth.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.auth.dto.OAuthLoginReqDto
import com.hotspot.auth.service.OAuthServiceFactory
import org.springframework.hateoas.EntityModel
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
@RequestMapping("/auth")
class AuthController(
    private val oAuthServiceFactory: OAuthServiceFactory,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
) {
    @GetMapping("/login")
    fun loginPage(): String{
        return "login"
    }
    /**
     * 소셜 로그인 API
     */
    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                .process(oAuthLoginReqDto)
        )
    }
}