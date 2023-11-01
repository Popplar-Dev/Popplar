package com.hotspot.achievement.dto

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.MemberCategoryCount

class MemberCategoryCountResDto (

    val categoryName: String,

    val visitedSet: Int,
) {

    companion object {
        fun create(category: Category, visitedSet: Int): MemberCategoryCountResDto {
            return MemberCategoryCountResDto(
                categoryName = category.toKor(),
                visitedSet = visitedSet
            )
        }
    }
}