package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "stamps")
class Stamp (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val hotPlaceId: Long,
) : BaseEntity()