package com.hotspot.member.repository;

import com.hotspot.member.entity.Category
import com.hotspot.member.entity.CategoryAchievement
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryAchievementRepository : JpaRepository<CategoryAchievement, Category> {
}