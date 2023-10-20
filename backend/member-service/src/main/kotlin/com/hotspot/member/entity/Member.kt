package com.hotspot.member.entity

import jakarta.persistence.*

@Entity
@Table(name = "members")
class Member (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name: String,

    var profileImage: String,

    @Enumerated(EnumType.STRING)
    val socialType: SocialType,

    val socialId: String,

    var exp: Int,

) : BaseEntity() {
    companion object {
        fun create(oAuthMember: OAuthMember): Member {
            return Member(
                name = "새 유저",
                profileImage = "default profile",
                exp = 0,
                socialType = oAuthMember.socialType,
                socialId = oAuthMember.socialId,
            )
        }
    }
}