package com.popplar.livechat.repository;

import com.popplar.livechat.entity.ChattingMember
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChattingMemberRepository : JpaRepository<ChattingMember, Long> {

    fun findByMemberId(memberId: Long): ChattingMember?
}