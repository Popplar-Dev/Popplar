package com.hotspot.member.dto

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.member.service.CryptService

class MemberProfileResDto(
    val id: Long,
    val name: String,
    val socialType: SocialType,
    val profileImage: String,
    val exp: Int,
    var jwt: String? = null,
) {

    fun insertJWT(jwt: String): MemberProfileResDto {
        this.jwt = jwt
        return this
    }

    companion object {
        fun create(cryptService: CryptService, member: Member): MemberProfileResDto {
            return MemberProfileResDto(
                id = cryptService.encrypt(member.id!!),
                name = member.name,
                socialType = member.socialType,
                profileImage = member.profileImage,
                exp = member.exp
            )
        }
    }

}