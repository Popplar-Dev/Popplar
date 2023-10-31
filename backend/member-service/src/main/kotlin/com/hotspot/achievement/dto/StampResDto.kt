package com.hotspot.achievement.dto

import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.Stamp

class StampResDto (

    val hotPlaceId: Long,

    val categoryName: String,

    val visitedCount: Int,
){

    companion object {
        fun create(stamp: Stamp): StampResDto {
            return StampResDto(
                hotPlaceId = stamp.hotPlaceId,
                categoryName = stamp.category.toKor(),
                visitedCount = stamp.visitedCount
            )
        }
    }
}