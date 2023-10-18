package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "members")
class Member (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null,

    private val email: String,

    private var name: String,

    private var profileImage: String,

    private val socialType: SocialType,

    private var exp: Int,

    )