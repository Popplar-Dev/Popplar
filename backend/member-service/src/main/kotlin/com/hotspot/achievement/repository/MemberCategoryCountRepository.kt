package com.hotspot.achievement.repository;

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.MemberCategoryCount
import org.springframework.data.jpa.repository.JpaRepository

interface MemberCategoryCountRepository : JpaRepository<MemberCategoryCount, Long> {

    fun findByMemberIdAndCategory(memberId: Long, category: Category): MemberCategoryCount?

    fun findByMemberId(memberId: Long): ArrayList<MemberCategoryCount>
}