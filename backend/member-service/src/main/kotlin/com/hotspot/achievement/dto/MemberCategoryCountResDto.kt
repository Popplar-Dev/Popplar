package com.hotspot.achievement.dto

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.MemberCategoryCount

class MemberCategoryCountResDto (

    val categoryName: String,

    val visitedSet: Int,
) {

    companion object {
        fun create(memberCategoryCount: MemberCategoryCount): MemberCategoryCountResDto {
            return MemberCategoryCountResDto(
                categoryName = memberCategoryCount.category.toKor(),
                visitedSet = memberCategoryCount.visitedSet
            )
        }
    }
}