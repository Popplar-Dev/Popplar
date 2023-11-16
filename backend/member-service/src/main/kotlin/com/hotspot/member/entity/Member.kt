package com.hotspot.member.entity

import com.hotspot.global.entity.BaseEntity
import com.hotspot.member.dto.MemberUpdateReqDto
import com.hotspot.auth.dto.OAuthMemberDto
import jakarta.persistence.*

@Entity
@Table(name = "members")
class Member(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name: String,

    var profileImage: String,

    @Enumerated(EnumType.STRING)
    val socialType: SocialType,

    val socialId: String,

    var exp: Int,

    var myHotPlaceId: Long,

    var firebaseToken: String? = null,
) : BaseEntity() {

    fun update(memberUpdateReqDto: MemberUpdateReqDto) {
        this.name = memberUpdateReqDto.name ?: this.name
        this.profileImage = memberUpdateReqDto.profileImage ?: this.profileImage
        this.myHotPlaceId = memberUpdateReqDto.myHotPlaceId ?: this.myHotPlaceId
    }

    fun insertFirebaseToken(firebaseToken: String?): Member {
        this.firebaseToken = firebaseToken
        return this
    }

    companion object {
        fun create(oAuthMemberDto: OAuthMemberDto): Member {
            return Member(
                name = "새 유저",
                profileImage = "https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/avatar1.png",
                exp = 0,
                socialType = oAuthMemberDto.socialType,
                socialId = oAuthMemberDto.socialId,
                myHotPlaceId = 0
            )
        }
    }
}