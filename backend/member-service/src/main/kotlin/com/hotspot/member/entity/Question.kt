package com.hotspot.member.entity

import com.hotspot.member.dto.QuestionReqDto
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
    val adoptedAnswer: Answer? = null,

    @OneToMany
    @JoinColumn(name = "questionId")
    val answerList: MutableList<Answer> = arrayListOf()
) : BaseEntity() {

    fun insertAnswer(answer: Answer) {
        this.answerList.add(answer)
    }

    companion object {
        fun create(cryptService: CryptService, hotPlaceId: Long, questionReqDto: QuestionReqDto): Question {
            return Question(
                memberId = cryptService.decrypt(questionReqDto.memberId),
                hotPlaceId = hotPlaceId,
                content = questionReqDto.content
            )
        }
    }
}