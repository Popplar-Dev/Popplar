package com.hotspot.member.dto

import java.time.LocalDateTime

class AnswerResDto (

    val id: Long,

    var content: String,

    val memberId: Long,

    val memberName: String,

    val memberProfileImage: String,

    val createdAt: LocalDateTime,

    val updatedAt: LocalDateTime
)