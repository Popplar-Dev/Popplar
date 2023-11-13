package com.popplar.livechat.repository;

import com.popplar.livechat.entity.ChattingConqueror
import org.springframework.data.jpa.repository.JpaRepository

interface ChattingConquerorRepository : JpaRepository<ChattingConqueror, Long> {

    fun findByChattingRoomId(chattingRoomId: Long): ChattingConqueror?
}