package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "member_category_counts")
class MemberCategoryCount (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    @Enumerated(EnumType.STRING)
    val category: Category,

    var visitedSet: Int,
) {

    fun increaseVisitedSet() {
        visitedSet++
    }

    companion object {
        fun create(stamp: Stamp): MemberCategoryCount {
            return MemberCategoryCount(
                memberId = stamp.memberId,
                category = stamp.category,
                visitedSet = 0
            )
        }
    }
}