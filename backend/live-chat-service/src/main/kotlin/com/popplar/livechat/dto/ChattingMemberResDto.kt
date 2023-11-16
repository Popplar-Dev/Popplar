package com.popplar.livechat.dto

import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.service.CryptService

class ChattingMemberResDto (
    val memberId: Long,
    val memberName: String,
    val memberProfileImage: String,
) {
    companion object {
        fun create(cryptService: CryptService, chattingMember: ChattingMember): ChattingMemberResDto {
            return ChattingMemberResDto(
                memberId = cryptService.encrypt(chattingMember.memberId),
                memberName = chattingMember.memberName,
                memberProfileImage = chattingMember.memberProfileImage
            )
        }
    }
}