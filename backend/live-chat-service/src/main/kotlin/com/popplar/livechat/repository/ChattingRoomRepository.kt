package com.popplar.livechat.repository;

import com.popplar.livechat.entity.ChattingRoom
import org.springframework.data.jpa.repository.JpaRepository

interface ChattingRoomRepository : JpaRepository<ChattingRoom, Long> {

    fun findByMemberId(memberId: Long): ChattingRoom?

    fun findByChattingRoomIdAndMemberId(chattingRoomId: Long, memberId: Long): ChattingRoom?
}