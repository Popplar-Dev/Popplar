package com.hotspot.member.dto

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.member.service.CryptService

class MemberProfileResDto(
    var id: Long,
    var name: String,
    var socialType: SocialType,
    var profileImage: String,
    var exp: Int,
) {

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