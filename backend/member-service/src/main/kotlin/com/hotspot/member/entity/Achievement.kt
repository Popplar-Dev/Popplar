//package com.hotspot.member.entity
//
//import jakarta.persistence.*
//import java.util.ArrayList
//
//@Entity
//@Table(name = "achievements")
//class Achievement(
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    val id: Long? = null,
//
//    var title: String,
//
//    var description: String,
//
//    var targetCount: Int,
//
//    var finished: Boolean,
//
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id")
//    var achievementTargetList: MutableList<AchievementTarget> = ArrayList(),
//
//) : BaseEntity()