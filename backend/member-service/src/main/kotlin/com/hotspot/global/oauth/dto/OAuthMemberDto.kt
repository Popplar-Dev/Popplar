package com.hotspot.global.oauth.dto

import com.hotspot.member.entity.SocialType

class OAuthMemberDto(
    val socialType: SocialType,
    val socialId: String,
)