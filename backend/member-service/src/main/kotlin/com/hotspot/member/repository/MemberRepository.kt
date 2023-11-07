package com.hotspot.member.repository;

import com.hotspot.member.entity.Member
import org.springframework.data.jpa.repository.JpaRepository

interface MemberRepository : JpaRepository<Member, Long> {

    fun findByIdAndDeletedFalse(memberId: Long): Member?
    fun findBySocialIdAndDeletedFalse(socialId: String): Member?
    fun findByIdIn(memberIdList: List<Long>): ArrayList<Member>
}