package com.hotspot.member.dto

import com.hotspot.member.entity.SocialType

class MemberProfileResDto (
    val id: Long,
    var name: String,
    var socialType: SocialType,
    var profileImage: String,
    var exp: Int,
)