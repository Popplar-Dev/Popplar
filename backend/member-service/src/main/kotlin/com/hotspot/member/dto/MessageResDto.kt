package com.hotspot.member.dto

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.Message

class MessageResDto(

    val sentMemberId: Long,

    val sentMemberName: String,

    val receivedMemberId: Long,

    val receivedMemberName: String,

    val content: String,

    val checked: Boolean,
) {

    companion object {
        fun create(message: Message, sentMember: Member, receivedMember: Member): MessageResDto {
            return MessageResDto(
                sentMemberId = sentMember.id!!,
                sentMemberName = sentMember.name,
                receivedMemberId = receivedMember.id!!,
                receivedMemberName = receivedMember.name,
                content = message.content,
                checked = message.checked
            )
        }
    }
}