package com.hotspot.member.repository;

import com.hotspot.member.entity.Stamp
import org.springframework.data.jpa.repository.JpaRepository

interface StampRepository : JpaRepository<Stamp, Long> {

    fun findAllByMemberId(memberId: Long): ArrayList<Stamp>

    fun findByMemberIdAndHotPlaceId(memberId: Long, hotPlaceId: Long): Stamp?
}