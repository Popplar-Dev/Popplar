package com.hotspot.member.dto

import com.hotspot.member.entity.Member

class MemberInfoDto(
        var name: String,
        var profileImage: String
) {
    companion object {
        fun create(member: Member): MemberInfoDto {
            return MemberInfoDto(
                    name = member.name,
                    profileImage = member.profileImage
            )
        }
    }
}