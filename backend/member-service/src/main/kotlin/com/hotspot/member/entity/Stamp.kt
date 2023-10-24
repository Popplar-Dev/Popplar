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

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    var achievementTargetList: MutableList<AchievementTarget> = ArrayList(),

) : BaseEntity()