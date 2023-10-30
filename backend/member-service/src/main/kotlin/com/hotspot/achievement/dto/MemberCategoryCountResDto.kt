package com.hotspot.achievement.dto

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.MemberCategoryCount

class MemberCategoryCountResDto (

    val category: Category,

    val visitedSet: Int,
) {

    companion object {
        fun create(memberCategoryCount: MemberCategoryCount): MemberCategoryCountResDto {
            return MemberCategoryCountResDto(
                category = memberCategoryCount.category,
                visitedSet = memberCategoryCount.visitedSet
            )
        }
    }
}