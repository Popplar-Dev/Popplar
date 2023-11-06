package com.hotspot.member.dto

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.Message

class MessageResDto(

    val messageId: Long,

    val sentMemberId: Long,

    val sentMemberName: String,

    val sentMemberProfileImage: String,

    val receivedMemberId: Long,

    val receivedMemberName: String,

    val content: String,

    val checked: Boolean,
) {

    companion object {
        fun create(message: Message, sentMember: Member, receivedMember: Member): MessageResDto {
            return MessageResDto(
                sentMemberId = sentMember.id!!,
                sentMemberName = if (sentMember.deleted) "탈퇴 회원" else sentMember.name,
                sentMemberProfileImage = sentMember.profileImage,
                receivedMemberId = receivedMember.id!!,
                receivedMemberName = receivedMember.name,
                messageId = message.id!!,
                content = message.content,
                checked = message.checked
            )
        }
    }
}