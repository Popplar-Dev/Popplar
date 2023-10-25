package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "member_category_counts")
class MemberCategoryCount (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Enumerated(EnumType.STRING)
    val category: Category,

    var visitedSet: Int,
)