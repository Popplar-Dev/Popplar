package com.hotspot.auth.dto

import com.hotspot.member.entity.SocialType

class OAuthMemberDto(
    val socialType: SocialType,
    val socialId: String,
)