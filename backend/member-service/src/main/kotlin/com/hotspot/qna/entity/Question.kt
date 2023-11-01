package com.hotspot.qna.entity

import com.hotspot.qna.dto.QuestionReqDto
import com.hotspot.global.entity.BaseEntity
import com.hotspot.member.service.CryptService
import jakarta.persistence.*

@Entity
@Table(name = "questions")
class Question(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val hotPlaceId: Long,

    var content: String,

    @OneToOne
    var adoptedAnswer: Answer? = null,

    @OneToMany
    @JoinColumn(name = "questionId")
    val answerList: MutableList<Answer> = arrayListOf()
) : BaseEntity() {

    fun adopt(answer: Answer) {
        this.adoptedAnswer = answer
    }

    fun update(content: String) {
        this.content = content
    }

    companion object {
        fun create(cryptService: CryptService, questionReqDto: QuestionReqDto): Question {
            return Question(
                memberId = cryptService.decrypt(questionReqDto.memberId),
                hotPlaceId = questionReqDto.hotPlaceId,
                content = questionReqDto.content
            )
        }
    }
}