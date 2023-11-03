package com.hotspot.global.eureka.dto

import com.hotspot.member.entity.Member

class ChattingMemberReqDto (

    val memberId: Long,
    val memberName: String,
    val memberProfileImage: String,
) {

    companion object {
        fun create(member: Member): ChattingMemberReqDto {
            return ChattingMemberReqDto(
                memberId = member.id!!,
                memberName = member.name,
                memberProfileImage = member.profileImage,
            )
        }
    }
}