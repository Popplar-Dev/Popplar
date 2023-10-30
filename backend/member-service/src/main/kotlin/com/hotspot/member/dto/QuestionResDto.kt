package com.hotspot.member.dto

import com.hotspot.member.entity.Question
import java.time.LocalDateTime

class QuestionResDto(

    val id: Long,

    var content: String,

    val hotPlaceId: Long,

    val memberId: Long,

    val memberName: String,

    val memberProfileImage: String,

    val createdAt: LocalDateTime,

    val updatedAt: LocalDateTime
) {

    companion object {
        fun create(question: Question, memberName: String, memberProfileImage: String): QuestionResDto {
            return QuestionResDto(
                id = question.id!!,
                hotPlaceId = question.hotPlaceId,
                content = question.content,
                memberId = question.memberId,
                memberName = memberName,
                memberProfileImage = memberProfileImage,
                createdAt = question.createdAt,
                updatedAt = question.updatedAt
            )
        }
    }
}