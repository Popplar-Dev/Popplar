package com.hotspot.achievement.entity

import com.hotspot.achievement.dto.StampReqDto
import com.hotspot.global.entity.BaseEntity
import com.hotspot.global.eureka.dto.HotPlaceResDto
import jakarta.persistence.*

@Entity
@Table(name = "stamps")
class Stamp(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val hotPlaceId: Long,

    val hotPlaceName: String,

    @Enumerated(EnumType.STRING)
    val category: Category,

    var visitedCount: Int,

    ) : BaseEntity() {
    fun increaseVisitCount() {
        visitedCount++
    }

    companion object {
        fun create(memberId: Long, hotPlaceResDto: HotPlaceResDto): Stamp {
            return Stamp(
                memberId = memberId,
                hotPlaceId = hotPlaceResDto.id,
                hotPlaceName = hotPlaceResDto.placeName,
                category = Category.parse(hotPlaceResDto.category),
                visitedCount = 0
            )
        }
    }

}