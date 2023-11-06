package com.popplar.livechat.entity

import jakarta.persistence.*

@Entity
@Table(name = "chatting_rooms")
class ChattingRoom(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val chattingRoomId: Long,

    val memberId: Long,
) : BaseEntity() {
}