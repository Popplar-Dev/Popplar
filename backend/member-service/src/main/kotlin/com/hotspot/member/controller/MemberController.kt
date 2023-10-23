package com.hotspot.member.controller

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.oauth.OAuthTokenDto
import com.hotspot.member.entity.Member
import com.hotspot.member.oauth.OAuthMember
import com.hotspot.member.entity.SocialType
import com.hotspot.member.mapper.MemberMapper
import com.hotspot.member.oauth.GoogleGetTokenDto
import com.hotspot.member.service.MemberService
import com.hotspot.member.oauth.service.OAuthServiceFactory
import lombok.RequiredArgsConstructor
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
class MemberController(
    private val memberService: MemberService,
    private val oAuthServiceFactory: OAuthServiceFactory,
) {

    @GetMapping("/login")
    fun login(@RequestParam code: String): MemberProfileResDto {
        // TODO
        //  프론트 완성 전 임시로 code만 받음
        //  추후 class 생성해서 code, type post로 받도록 해야 함
        val oAuthTokenDto: OAuthTokenDto =
            oAuthServiceFactory.getOauthService(SocialType.GOOGLE).getAccessToken(code)
        val oAuthMember: OAuthMember =
            oAuthServiceFactory.getOauthService(SocialType.GOOGLE).getUser(oAuthTokenDto.accessToken)
        val member = oAuthServiceFactory.getOauthService(SocialType.KAKAO).login(oAuthMember)

        // TODO
        //  HATEOAS 적용 필요
        return MemberMapper.INSTANCE.entityToMemberDto(member)
    }
}