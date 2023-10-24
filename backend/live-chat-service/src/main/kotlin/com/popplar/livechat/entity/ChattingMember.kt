package com.popplar.livechat.entity

import jakarta.persistence.*

@Entity
@Table(name = "chatting_members")
class ChattingMember(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    var memberName: String,

    var memberProfileImage: String,
)