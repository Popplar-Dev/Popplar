package com.hotspot.member.dto

import java.time.LocalDateTime

class QuestionResDto(

    val memberId: Long,

    val memberName: Long,

    val content: String,

    val createdAt: LocalDateTime,

    val updateAt: LocalDateTime,

) {

    // TODO
    //  memberName, profileImage 필요,,
//    companion object {
//        fun create(): QuestionResDto {
//            return QuestionResDto()
//        }
//    }
}