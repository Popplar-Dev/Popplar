package com.hotspot.global.oauth.service

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.dto.OAuthMemberDto
import com.hotspot.global.oauth.dto.OAuthTokenDto
import com.hotspot.member.service.CryptService

interface OAuthService {
    fun process(accessToken: String): MemberProfileResDto {
        return generateJWT(login(getUser(accessToken)))
    }

    fun getSocialType(): SocialType
    fun getAccessToken(code: String): OAuthTokenDto
    fun getUser(accessToken: String): OAuthMemberDto
    fun login(oAuthMemberDto: OAuthMemberDto): Member
    fun generateJWT(member: Member): MemberProfileResDto
}