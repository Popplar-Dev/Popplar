package com.hotspot.global.eureka.dto

import com.hotspot.achievement.entity.Stamp
import java.time.LocalDateTime

class VisitorReqDto (

    val hotPlaceId: Long,

    val memberId: Long,

    val visitedDate: LocalDateTime,
) {

    companion object {
        fun create(stamp: Stamp): VisitorReqDto {
            return VisitorReqDto(
                hotPlaceId = stamp.hotPlaceId,
                memberId = stamp.memberId,
                visitedDate = stamp.updatedAt,
            )
        }
    }
}