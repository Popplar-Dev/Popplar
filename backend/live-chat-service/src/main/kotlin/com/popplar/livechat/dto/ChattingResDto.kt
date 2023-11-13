package com.popplar.livechat.dto

import com.popplar.livechat.entity.Chatting
import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.service.CryptService
import java.time.LocalDateTime

class ChattingResDto(

    val chattingId: Long,
    val chattingRoomId: Long,
    val chattingContent: String,
    val chattingCreatedAt: LocalDateTime,
    val memberId: Long,
    val memberName: String,
    val memberProfileImage: String,
    val isConqueror: Boolean
) {

    companion object {

        fun create(
            cryptService: CryptService,
            chatting: Chatting,
            chattingMember: ChattingMember,
            isConqueror: Boolean
        ): ChattingResDto {
            return ChattingResDto(
                chattingId = chatting.id!!,
                chattingRoomId = chatting.chattingRoomId,
                chattingContent = chatting.content,
                chattingCreatedAt = chatting.createdAt,
                memberId = cryptService.encrypt(chattingMember.memberId),
                memberName = chattingMember.memberName,
                memberProfileImage = chattingMember.memberProfileImage,
                isConqueror = isConqueror
            )
        }
    }
}