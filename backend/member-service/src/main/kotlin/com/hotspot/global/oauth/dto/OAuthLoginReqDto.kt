package com.hotspot.global.oauth.dto

import com.hotspot.member.entity.SocialType

// TODO
//  프론트 로그인 로직 처리 시 사용
class OAuthLoginReqDto(
    val accessToken: String,
    val loginType: SocialType
)