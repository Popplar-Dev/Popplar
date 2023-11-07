package com.popplar.livechat.dto

import com.popplar.livechat.entity.ChattingMember

class ChattingMemberResDto (
    val memberId: Long,
    val memberName: String,
    val memberProfileImage: String,
) {
    companion object {
        fun create(chattingMember: ChattingMember): ChattingMemberResDto {
            return ChattingMemberResDto(
                memberId = chattingMember.memberId,
                memberName = chattingMember.memberName,
                memberProfileImage = chattingMember.memberProfileImage
            )
        }
    }
}