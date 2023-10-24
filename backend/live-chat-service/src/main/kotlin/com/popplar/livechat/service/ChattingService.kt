package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingReqDto
import com.popplar.livechat.dto.ChattingResDto
import com.popplar.livechat.entity.Chatting
import com.popplar.livechat.repository.ChattingMemberRepository
import com.popplar.livechat.repository.ChattingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ChattingService(

    private val cryptService: CryptService,
    private val chattingRepository: ChattingRepository,
    private val chattingMemberRepository: ChattingMemberRepository,
) {

    @Transactional
    fun insertChatting(chattingReqDto: ChattingReqDto): ChattingResDto {
        val decryptedId = cryptService.decrypt(chattingReqDto.memberId)
        val chattingMember = chattingMemberRepository.findByMemberId(decryptedId)
            ?: throw RuntimeException("해당하는 회원이 없습니다.")
        chattingRepository.save(
            Chatting(
                chattingRoomId = chattingReqDto.chattingRoomId,
                memberId = decryptedId,
                content = chattingReqDto.chattingContent
            )
        )
        return ChattingResDto(
            chattingRoomId = chattingReqDto.chattingRoomId,
            chattingContent = chattingReqDto.chattingContent,
            memberId = chattingReqDto.memberId,
            memberName = chattingMember.memberName,
            memberProfileImage = chattingMember.memberProfileImage
        )
    }
}