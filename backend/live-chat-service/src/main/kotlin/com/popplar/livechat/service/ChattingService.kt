package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingReqDto
import com.popplar.livechat.dto.ChattingResDto
import com.popplar.livechat.entity.Chatting
import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.entity.ChattingRoom
import com.popplar.livechat.repository.ChattingMemberRepository
import com.popplar.livechat.repository.ChattingRepository
import com.popplar.livechat.repository.ChattingRoomRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ChattingService(

    private val cryptService: CryptService,
    private val chattingRepository: ChattingRepository,
    private val chattingMemberRepository: ChattingMemberRepository,
    private val chattingRoomRepository: ChattingRoomRepository,
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

    fun getMyChattingRoomId(memberId: Long): Long {
        val chattingRoom = chattingRoomRepository.findByMemberIdAndDeletedFalse(memberId)
            ?: return 0
        return chattingRoom.chattingRoomId
    }

    @Transactional
    fun enterChattingRoom(chattingRoomId: Long, memberId: Long) {
        if (chattingRoomRepository.findByChattingRoomIdAndMemberIdAndDeletedFalse(
                chattingRoomId,
                memberId
            ) != null
        ) {
            throw RuntimeException("이미 채팅방에 참여하였습니다")
        }
        chattingRoomRepository.save(
            ChattingRoom(
                chattingRoomId = chattingRoomId,
                memberId = memberId
            )
        )
    }

    @Transactional
    fun leaveChattingRoom(chattingRoomId: Long, memberId: Long) {
        findChattingRoomByChattingRoomIdAndMemberId(chattingRoomId, memberId).delete()
    }

    fun findChattingMemberByMemberId(memberId: Long): ChattingMember {
        return chattingMemberRepository.findByMemberId(memberId)
            ?: throw RuntimeException("해당하는 회원이 없습니다.")
    }

    fun findChattingRoomByChattingRoomIdAndMemberId(
        chattingRoomId: Long,
        memberId: Long
    ): ChattingRoom {
        return chattingRoomRepository.findByChattingRoomIdAndMemberIdAndDeletedFalse(chattingRoomId, memberId)
            ?: throw RuntimeException("채팅방에 참여하지 않은 회원입니다")
    }
}