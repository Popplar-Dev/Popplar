package com.hotspot.qna.entity

import com.hotspot.qna.dto.AnswerReqDto
import com.hotspot.global.entity.BaseEntity
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

    fun update(content: String) {
        this.content = content
    }

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