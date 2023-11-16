package com.popplar.livechat.repository;

import com.popplar.livechat.entity.ChattingRoom
import org.springframework.data.jpa.repository.JpaRepository

interface ChattingRoomRepository : JpaRepository<ChattingRoom, Long> {

    fun findByMemberIdAndDeletedFalse(memberId: Long): ChattingRoom?

    fun findByChattingRoomIdAndMemberIdAndDeletedFalse(chattingRoomId: Long, memberId: Long): ChattingRoom?
}