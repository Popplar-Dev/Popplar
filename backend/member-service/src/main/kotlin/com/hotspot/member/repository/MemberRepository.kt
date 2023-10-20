package com.hotspot.member.repository;

import com.hotspot.member.entity.Member
import org.springframework.data.jpa.repository.JpaRepository

interface MemberRepository : JpaRepository<Member, Long> {
    fun findBySocialIdAndDeletedFalse(socialId: String): Member?
}