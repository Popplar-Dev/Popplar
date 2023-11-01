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

    var hotPlaceName: String,

    @Enumerated(EnumType.STRING)
    var category: Category,

    var visitedCount: Int,

    ) : BaseEntity() {
    fun increaseVisitCount() {
        visitedCount++
    }

    fun update(hotPlaceResDto: HotPlaceResDto) {
        this.hotPlaceName = hotPlaceResDto.placeName
        this.category = Category.parse(hotPlaceResDto.category)
    }

    companion object {
        fun create(memberId: Long, hotPlaceId: Long): Stamp {
            return Stamp(
                memberId = memberId,
                hotPlaceId = hotPlaceId,
                hotPlaceName = "NOT_YET",
                category = Category.NOT_YET,
                visitedCount = 0
            )
        }
    }

}