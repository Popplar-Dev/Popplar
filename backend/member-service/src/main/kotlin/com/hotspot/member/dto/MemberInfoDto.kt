package com.hotspot.member.dto

import com.hotspot.member.entity.Member

class MemberInfoDto(
        val id: Long? = null,
        var name: String,
        var profileImage: String
) {
    companion object {
        fun create(member: Member): MemberInfoDto {
            return MemberInfoDto(
                    id = member.id,
                    name = member.name,
                    profileImage = member.profileImage
            )
        }
    }
}