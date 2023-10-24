package com.hotspot.member.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "blocked_members")
class BlockedMember (

    @Id
    @GeneratedValue
    val id: Long? = null,

    val memberId: Long,

    val blockedMemberId: Long,
)