package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "members")
class Member (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val email: String,

    var name: String,

    var profileImage: String,

    @Enumerated(EnumType.STRING)
    val socialType: SocialType,

    var exp: Int,

)