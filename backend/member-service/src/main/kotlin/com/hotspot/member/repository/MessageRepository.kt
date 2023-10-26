package com.hotspot.member.repository;

import com.hotspot.member.entity.Message
import org.springframework.data.jpa.repository.JpaRepository

interface MessageRepository : JpaRepository<Message, Long> {
}