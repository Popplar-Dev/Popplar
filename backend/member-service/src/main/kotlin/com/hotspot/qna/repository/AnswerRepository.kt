package com.hotspot.qna.repository;

import com.hotspot.qna.entity.Answer
import org.springframework.data.jpa.repository.JpaRepository

interface AnswerRepository : JpaRepository<Answer, Long> {

    fun findByIdAndDeletedFalse(answerId: Long): Answer?
}