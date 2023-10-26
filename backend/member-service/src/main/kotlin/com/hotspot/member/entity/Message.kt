package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "messages")
class Message(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val sentMemberId: Long,

    val receivedMemberId: Long,

    val content: String,

    var checked: Boolean
) : BaseEntity() {
    
    companion object {
        fun create(sentMemberId: Long, receivedMemberId: Long, content: String): Message {
            return Message(
                sentMemberId = sentMemberId,
                receivedMemberId = receivedMemberId,
                content = content,
                checked = false
            )
        }
    }
}