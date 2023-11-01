package com.hotspot.global.oauth.service

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.OAuthMember
import com.hotspot.global.oauth.OAuthTokenDto
import com.hotspot.member.service.CryptService

interface OAuthService {
    fun process(cryptService: CryptService, code: String): MemberProfileResDto {
        return MemberProfileResDto.create(cryptService, login(getUser(getAccessToken(code).accessToken)))
    }

    fun getSocialType(): SocialType
    fun getAccessToken(code: String): OAuthTokenDto
    fun getUser(accessToken: String): OAuthMember
    fun login(oAuthMember: OAuthMember): Member
}