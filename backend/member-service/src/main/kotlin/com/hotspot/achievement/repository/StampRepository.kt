package com.hotspot.achievement.repository;

import com.hotspot.achievement.entity.Stamp
import org.springframework.data.jpa.repository.JpaRepository

interface StampRepository : JpaRepository<Stamp, Long> {

    fun findAllByMemberId(memberId: Long): ArrayList<Stamp>

    fun findByMemberIdAndHotPlaceId(memberId: Long, hotPlaceId: Long): Stamp?
}