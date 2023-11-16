package com.hotspot.auth.service

import com.hotspot.auth.dto.OAuthLoginReqDto
import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.auth.dto.OAuthMemberDto
import com.hotspot.auth.dto.OAuthTokenDto

interface OAuthService {
    fun process(oAuthLoginReqDto: OAuthLoginReqDto): MemberProfileResDto {
        return generateJWT(
            insertFirebaseToken(
                login(getUser(oAuthLoginReqDto.accessToken)),
                oAuthLoginReqDto.firebaseToken
            )
        )
    }

    fun getSocialType(): SocialType
    fun getAccessToken(code: String): OAuthTokenDto
    fun getUser(accessToken: String): OAuthMemberDto
    fun login(oAuthMemberDto: OAuthMemberDto): Member
    fun insertFirebaseToken(member: Member, firebaseToken: String): Member
    fun generateJWT(member: Member): MemberProfileResDto
}