package com.hotspot.member.service

import com.hotspot.global.eureka.dto.ChattingMemberReqDto
import com.hotspot.global.eureka.dto.ChattingMemberResDto
import com.hotspot.global.oauth.dto.OAuthMemberDto
import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.dto.MemberUpdateReqDto
import com.hotspot.member.entity.BlockedMember
import com.hotspot.member.entity.Member
import com.hotspot.member.repository.BlockedMemberRepository
import com.hotspot.member.repository.MemberRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient

@Service
@Transactional(readOnly = true)
class MemberService(

    private val webClient: WebClient,
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
    private val blockedMemberRepository: BlockedMemberRepository,

    @Value("\${LIVE_CHAT_URL}")
    private val liveChatURL: String,

) {

    fun createMember(oAuthMemberDto: OAuthMemberDto): Member {
        val member = memberRepository.save(Member.create(oAuthMemberDto))

        webClient.post()
            .uri("$liveChatURL/chatting-member")
            .bodyValue(ChattingMemberReqDto.create(member))
            .retrieve()
            .bodyToMono(ChattingMemberResDto::class.java)
            .block()

        return member
    }

    fun getMemberProfile(memberId: Long): MemberProfileResDto {
        return MemberProfileResDto.create(cryptService, findMemberByEncryptedId(memberId))
    }

    @Transactional
    fun updateMemberProfile(
        memberId: Long,
        memberUpdateReqDto: MemberUpdateReqDto
    ): MemberProfileResDto {
        val member = findMemberByEncryptedId(memberId)
        member.update(memberUpdateReqDto)

        webClient.patch()
            .uri("$liveChatURL/chatting-member")
            .bodyValue(ChattingMemberReqDto.create(member))
            .retrieve()
            .bodyToMono(ChattingMemberResDto::class.java)
            .block()

        return MemberProfileResDto.create(cryptService, member)
    }

    @Transactional
    fun deleteMember(memberId: Long) {
        val member = findMemberByEncryptedId(memberId)
        member.delete()
    }

    @Transactional
    fun blockMember(memberId: Long, blockedMemberId: Long) {
        val decryptedMemberId = cryptService.decrypt(memberId)
        val decryptedBlockedMemberId = cryptService.decrypt(blockedMemberId)
        if (blockedMemberRepository.findByMemberIdAndBlockedMemberId(
                decryptedMemberId,
                decryptedBlockedMemberId
            ) != null
        ) {
            throw RuntimeException("이미 차단한 회원입니다.")
        }
        blockedMemberRepository.save(
            BlockedMember(
                memberId = decryptedMemberId,
                blockedMemberId = decryptedBlockedMemberId
            )
        )
    }

    @Transactional
    fun unBlockMember(memberId: Long, blockedMemberId: Long) {
        val decryptedMemberId = cryptService.decrypt(memberId)
        val decryptedBlockedMemberId = cryptService.decrypt(blockedMemberId)
        val blockedMember =
            blockedMemberRepository.findByMemberIdAndBlockedMemberId(
                decryptedMemberId,
                decryptedBlockedMemberId
            )
                ?: throw RuntimeException("차단하지 않은 회원입니다.")
        blockedMemberRepository.delete(blockedMember)
    }

    fun findMemberByEncryptedId(encryptedId: Long): Member {
        return memberRepository.findById(cryptService.decrypt(encryptedId))
            .orElseThrow { throw ArithmeticException("사용자 정보가 없습니다.") }
    }
}