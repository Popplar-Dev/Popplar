package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingMemberReqDto
import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.repository.ChattingMemberRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ChattingMemberService(

    private val cryptService: CryptService,
    private val chattingMemberRepository: ChattingMemberRepository,
) {

    @Transactional
    fun createChattingMember(chattingMemberReqDto: ChattingMemberReqDto) {
        chattingMemberRepository.save(
            ChattingMember(
                memberId = chattingMemberReqDto.memberId,
                memberName = chattingMemberReqDto.memberName,
                memberProfileImage = chattingMemberReqDto.memberProfileImage
            )
        )
    }

    @Transactional
    fun updateChattingMember(chattingMemberReqDto: ChattingMemberReqDto) {
        val member =
            chattingMemberRepository.findByMemberId(chattingMemberReqDto.memberId)
                ?: throw RuntimeException("회원을 찾을 수 없습니다.")
        member.update(chattingMemberReqDto)
    }
}