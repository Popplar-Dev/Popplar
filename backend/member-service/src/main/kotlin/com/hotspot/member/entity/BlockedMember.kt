package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "blocked_members")
class BlockedMember (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val memberId: Long,

    val blockedMemberId: Long,
)