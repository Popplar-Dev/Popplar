package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "category_achivements")
class CategoryAchievement (

    @Id
    @Enumerated(EnumType.STRING)
    val id: Category,

    var title: String,

    var description: String,
)