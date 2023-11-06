package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingReqDto
import com.popplar.livechat.dto.ChattingResDto
import com.popplar.livechat.entity.Chatting
import com.popplar.livechat.entity.ChattingMember
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
    fun insertChatting(chattingReqDto: ChattingReqDto, chattingRoomId: Long): ChattingResDto {
        val decryptedId = cryptService.decrypt(chattingReqDto.memberId)
        val chattingMember = findChattingMemberByMemberId(decryptedId)
        val chatting = chattingRepository.save(
            Chatting(
                chattingRoomId = chattingRoomId,
                memberId = decryptedId,
                content = chattingReqDto.chattingContent
            )
        )
        return ChattingResDto.create(chatting, chattingMember)
    }

    fun getChattingByChattingRoomId(chattingRoomId: Long): List<ChattingResDto> {
        val chattingList = chattingRepository.findAllByChattingRoomId(chattingRoomId)

        return chattingList.map {
            val chattingMember = findChattingMemberByMemberId(it.memberId)
            ChattingResDto.create(it, chattingMember)
        }.toList()
    }

    fun findChattingMemberByMemberId(memberId: Long): ChattingMember {
        return chattingMemberRepository.findByMemberId(memberId)
            ?: throw RuntimeException("해당하는 회원이 없습니다.")
    }
}