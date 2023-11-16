package com.hotspot.message.repository;

import com.hotspot.message.entity.Message
import org.springframework.data.jpa.repository.JpaRepository

interface MessageRepository : JpaRepository<Message, Long> {

    fun findByIdAndDeletedFalse(messageId: Long): Message?

    fun findAllBySentMemberIdAndDeletedFalse(sentMemberId: Long): ArrayList<Message>

    fun findAllByReceivedMemberIdAndDeletedFalse(receivedMemberId: Long): ArrayList<Message>
}