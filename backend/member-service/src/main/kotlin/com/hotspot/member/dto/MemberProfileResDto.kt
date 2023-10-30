package com.hotspot.member.dto

import com.hotspot.member.entity.SocialType

class MemberProfileResDto(
    var id: Long,
    var name: String,
    var socialType: SocialType,
    var profileImage: String,
    var exp: Int,
) {

    // TODO 변경할 방법 찾아보기
    fun encrypt(saltA: Long, saltB: Long, saltC: Long): MemberProfileResDto {
        this.id *= saltA * saltB * saltC
        return this
    }
}