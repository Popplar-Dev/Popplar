package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingMemberReqDto
import com.popplar.livechat.dto.ChattingMemberResDto
import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.fco.ChattingMemberFactory
import com.popplar.livechat.repository.ChattingMemberRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ChattingMemberService(

    private val cryptService: CryptService,
    private val chattingMemberRepository: ChattingMemberRepository,
    private val chattingMemberFactory: ChattingMemberFactory,
) {

    fun getChattingMember(memberId: Long): ChattingMemberResDto {
        return ChattingMemberResDto.create(cryptService, findChattingMemberByMemberId(memberId))
    }

    @Transactional
    fun createChattingMember(chattingMemberReqDto: ChattingMemberReqDto): ChattingMemberResDto {
        val chattingMember = chattingMemberRepository.save(
            ChattingMember(
                memberId = chattingMemberReqDto.memberId,
                memberName = chattingMemberReqDto.memberName,
                memberProfileImage = chattingMemberReqDto.memberProfileImage
            )
        )

        chattingMemberFactory.updateChattingMember(chattingMember)

        return ChattingMemberResDto.create(cryptService, chattingMember)

    }

    @Transactional
    fun updateChattingMember(chattingMemberReqDto: ChattingMemberReqDto): ChattingMemberResDto {
        println(chattingMemberReqDto.memberId)
        val chattingMember =
            chattingMemberRepository.findByMemberId(chattingMemberReqDto.memberId)
                ?: throw RuntimeException("회원을 찾을 수 없습니다.")
        chattingMember.update(chattingMemberReqDto)

        chattingMemberFactory.updateChattingMember(chattingMember)

        return ChattingMemberResDto.create(cryptService, chattingMember)
    }

    fun findChattingMemberByMemberId(memberId: Long): ChattingMember {
//        return chattingMemberRepository.findByMemberId(memberId)
        return chattingMemberFactory.getChattingMember(memberId)
//            ?: throw RuntimeException("해당하는 회원이 없습니다.")
    }
}