package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "stamps")
class Stamp(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val hotPlaceId: Long,

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