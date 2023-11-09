package com.hotspot.member.dto

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.Message
import com.hotspot.member.service.CryptService
import java.time.LocalDateTime

class MessageResDto(

    val messageId: Long,

    val sentMemberId: Long,

    val sentMemberName: String,

    val sentMemberProfileImage: String,

    val receivedMemberId: Long,

    val receivedMemberName: String,

    val content: String,

    val checked: Boolean,

    val createdAt: LocalDateTime
) {

    companion object {
        fun create(cryptService: CryptService, message: Message, sentMember: Member, receivedMember: Member): MessageResDto {
            return MessageResDto(
                sentMemberId = cryptService.encrypt(sentMember.id!!),
                sentMemberName = if (sentMember.deleted) "탈퇴 회원" else sentMember.name,
                sentMemberProfileImage = sentMember.profileImage,
                receivedMemberId = receivedMember.id!!,
                receivedMemberName = receivedMember.name,
                messageId = message.id!!,
                content = message.content,
                checked = message.checked,
                createdAt = message.createdAt
            )
        }
    }
}