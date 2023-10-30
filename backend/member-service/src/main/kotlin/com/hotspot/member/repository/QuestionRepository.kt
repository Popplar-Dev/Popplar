package com.hotspot.member.repository;

import com.hotspot.member.entity.Question
import org.springframework.data.jpa.repository.JpaRepository

interface QuestionRepository : JpaRepository<Question, Long> {

    fun findByIdAndDeletedFalse(questionId: Long): Question?

    fun findAllByHotPlaceIdAndDeletedFalse(hotPlaceId: Long): ArrayList<Question>

}