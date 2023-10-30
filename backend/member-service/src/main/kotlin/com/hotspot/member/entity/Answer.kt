package com.hotspot.member.entity

import com.hotspot.member.dto.AnswerReqDto
import com.hotspot.member.service.CryptService
import jakarta.persistence.*

@Entity
@Table(name = "answers")
class Answer(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val questionId: Long,

    val hotPlaceId: Long,

    val memberId: Long,

    var content: String,
) : BaseEntity() {

    companion object {
        fun create(cryptService: CryptService, hotPlaceId: Long, questionId: Long, answerReqDto: AnswerReqDto): Answer {
            return Answer(
                questionId = questionId,
                hotPlaceId = hotPlaceId,
                memberId = cryptService.decrypt(answerReqDto.memberId),
                content = answerReqDto.content,
            )
        }
    }
}