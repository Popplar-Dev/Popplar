package com.hotspot.auth.dto

import com.hotspot.member.entity.SocialType

class OAuthLoginReqDto(
    val accessToken: String,
    val loginType: SocialType,
    val firebaseToken: String,
)