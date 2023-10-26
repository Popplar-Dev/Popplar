package com.popplar.qna.entity

import jakarta.persistence.*

@Entity
@Table(name = "questions")
class Question(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    var content: String,

    @OneToMany
    @JoinColumn(name = "id")
    val answerList: MutableList<Answer> = arrayListOf()
) : BaseEntity() {

    fun insertAnswer(answer: Answer) {
        this.answerList.add(answer)
    }

    companion object {
        fun create(memberId: Long, content: String): Question {
            return Question(memberId = memberId, content = content)
        }
    }
}