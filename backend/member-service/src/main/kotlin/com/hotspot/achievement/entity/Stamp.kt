package com.hotspot.achievement.entity

import com.hotspot.global.entity.BaseEntity
import jakarta.persistence.*

@Entity
@Table(name = "stamps")
class Stamp(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val hotPlaceId: Long,

    @Enumerated(EnumType.STRING)
    val category: Category,

    var visitedCount: Int,

    ) : BaseEntity() {
    fun increaseVisitCount() {
        visitedCount++
    }

    companion object {
        fun create(memberId: Long, hotPlaceId: Long, category: Category): Stamp {
            return Stamp(
                memberId = memberId,
                hotPlaceId = hotPlaceId,
                category = category,
                visitedCount = 1
            )
        }
    }

}