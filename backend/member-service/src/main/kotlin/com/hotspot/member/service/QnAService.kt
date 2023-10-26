package com.hotspot.member.service

import com.hotspot.member.repository.AnswerRepository
import com.hotspot.member.repository.QuestionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class QnAService (

    private val questionRepository: QuestionRepository,
    private val answerRepository: AnswerRepository,
){

    fun getQuestion(questionId: Long) {

    }
}