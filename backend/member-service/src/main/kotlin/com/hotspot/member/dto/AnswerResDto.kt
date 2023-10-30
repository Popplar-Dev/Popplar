package com.hotspot.member.dto

import com.hotspot.member.entity.Answer
import com.hotspot.member.service.CryptService
import java.time.LocalDateTime

class AnswerResDto (

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
        fun create(cryptService: CryptService, answer: Answer, memberName: String, memberProfileImage: String): AnswerResDto {
            return AnswerResDto(
                id = answer.id!!,
                content = answer.content,
                hotPlaceId = answer.hotPlaceId,
                memberId = cryptService.encrypt(answer.memberId),
                memberName = memberName,
                memberProfileImage = memberProfileImage,
                createdAt = answer.createdAt,
                updatedAt = answer.updatedAt
            )
        }
    }
}