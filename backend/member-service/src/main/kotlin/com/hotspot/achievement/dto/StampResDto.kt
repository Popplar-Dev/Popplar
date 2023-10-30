package com.hotspot.achievement.dto

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.Stamp

class StampResDto (

    val hotPlaceId: Long,

    val category: Category,

    val visitedCount: Int,
){

    companion object {
        fun create(stamp: Stamp): StampResDto {
            return StampResDto(
                hotPlaceId = stamp.hotPlaceId,
                category = stamp.category,
                visitedCount = stamp.visitedCount
            )
        }
    }
}