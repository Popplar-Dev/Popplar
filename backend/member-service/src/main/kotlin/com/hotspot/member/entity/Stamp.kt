package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "stamps")
class Stamp (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null,

    private val memberId: Long,

    private val hotPlaceId: Long,
)