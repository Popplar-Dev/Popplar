package com.popplar.livechat.entity

import jakarta.persistence.*

@Entity
@Table(name = "chattings")
class Chatting(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val content: String,
)