package com.hotspot.achievement.repository;

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.CategoryAchievement
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryAchievementRepository : JpaRepository<CategoryAchievement, Category> {
}