package com.popplar.livechat.dto

import com.popplar.livechat.entity.Chatting
import com.popplar.livechat.entity.ChattingMember
import java.time.LocalDateTime

class ChattingResDto(

    val chattingId: Long,
    val chattingRoomId: Long,
    val chattingContent: String,
    val chattingCreatedAt: LocalDateTime,
    val memberId: Long,
    val memberName: String,
    val memberProfileImage: String,
) {

    companion object {

        fun create(chatting: Chatting, chattingMember: ChattingMember): ChattingResDto {
            return ChattingResDto(
                chattingId = chatting.id!!,
                chattingRoomId = chatting.chattingRoomId,
                chattingContent = chatting.content,
                chattingCreatedAt = chatting.createdAt,
                memberId = chattingMember.memberId,
                memberName = chattingMember.memberName,
                memberProfileImage = chattingMember.memberProfileImage
            )
        }
    }
}