package com.hotspot.member.repository;

import com.hotspot.member.entity.MemberCategoryCount
import org.springframework.data.jpa.repository.JpaRepository

interface MemberCategoryCountRepository : JpaRepository<MemberCategoryCount, Long> {
}