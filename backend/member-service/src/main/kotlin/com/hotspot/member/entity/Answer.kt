package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "answers")
class Answer(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val questionId: Long,

    val memberId: Long,

    var content: String,
) : BaseEntity() {
    companion object {
        fun create(questionId: Long, memberId: Long, content: String): Answer {
            return Answer(
                questionId = questionId,
                memberId = memberId,
                content = content,
            )
        }
    }
}