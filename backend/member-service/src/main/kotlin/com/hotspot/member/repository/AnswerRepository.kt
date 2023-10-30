package com.hotspot.member.repository;

import com.hotspot.member.entity.Answer
import org.springframework.data.jpa.repository.JpaRepository

interface AnswerRepository : JpaRepository<Answer, Long> {
}