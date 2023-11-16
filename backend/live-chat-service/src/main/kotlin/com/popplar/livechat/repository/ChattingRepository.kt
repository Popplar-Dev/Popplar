package com.popplar.livechat.repository;

import com.popplar.livechat.entity.Chatting
import org.springframework.data.jpa.repository.JpaRepository

interface ChattingRepository : JpaRepository<Chatting, Long> {

    fun findAllByChattingRoomId(chattingRoomId: Long): ArrayList<Chatting>
}