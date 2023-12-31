package com.hotspot.member.repository;

import com.hotspot.member.entity.BlockedMember
import org.springframework.data.jpa.repository.JpaRepository

interface BlockedMemberRepository : JpaRepository<BlockedMember, Long> {

    fun findAllByMemberId(memberId: Long): Set<BlockedMember>


    fun findByMemberIdAndBlockedMemberId(memberId: Long, blockedMemberId: Long): BlockedMember?
}