package com.hotspot.message.entity

import com.hotspot.global.entity.BaseEntity
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

    var checked: Boolean,

    // 보낸 메세지함에서 삭제
    var sentMessageDeleted: Boolean = false,

    // 받은 메세지함에서 삭제
    var receivedMessageDeleted: Boolean = false,
) : BaseEntity() {

    fun check() {
        this.checked = true
    }

    fun sentMessageDelete() {
        this.sentMessageDeleted = true
    }

    fun receivedMessageDelete() {
        this.receivedMessageDeleted = true
    }

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