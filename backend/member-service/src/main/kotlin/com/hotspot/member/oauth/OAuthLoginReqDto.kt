package com.hotspot.member.oauth

import com.hotspot.member.entity.SocialType

// TODO
//  프론트 로그인 로직 처리 시 사용
class OAuthLoginReqDto (
    val code: String,
    val loginType: SocialType
)