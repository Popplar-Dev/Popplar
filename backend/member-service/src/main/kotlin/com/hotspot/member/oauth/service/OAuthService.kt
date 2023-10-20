package com.hotspot.member.oauth.service

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.member.oauth.OAuthMember
import com.hotspot.member.oauth.OAuthTokenDto

interface OAuthService {
    fun getSocialType(): SocialType
    fun getAccessToken(code: String): OAuthTokenDto
    fun getUser(accessToken: String): OAuthMember
    fun login(oAuthMember: OAuthMember): Member
}