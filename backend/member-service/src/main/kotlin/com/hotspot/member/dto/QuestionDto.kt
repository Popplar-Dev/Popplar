package com.hotspot.member.dto

import java.time.LocalDateTime

class QuestionDto(

    val id: Long,

    var content: String,

    val memberId: Long,

    val memberName: String,

    val createdAt: LocalDateTime,

    val updatedAt: LocalDateTime
)