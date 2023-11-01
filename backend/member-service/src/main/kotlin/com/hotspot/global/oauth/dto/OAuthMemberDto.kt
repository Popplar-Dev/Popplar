package com.hotspot.global.oauth

import com.hotspot.member.entity.SocialType

class OAuthMember(
    val socialType: SocialType,
    val socialId: String,
)