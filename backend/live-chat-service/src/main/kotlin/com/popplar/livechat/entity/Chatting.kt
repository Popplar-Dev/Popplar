package com.popplar.livechat.entity

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime

@Entity
@Table(name = "chattings")
@EntityListeners(value = [AuditingEntityListener::class])
class Chatting(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val chattingRoomId: Long,

    val memberId: Long,

    val content: String,

) : BaseEntity()