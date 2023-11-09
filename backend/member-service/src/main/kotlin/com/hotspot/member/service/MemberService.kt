package com.hotspot.member.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.hotspot.global.eureka.dto.ChattingMemberReqDto
import com.hotspot.global.eureka.dto.ChattingMemberResDto
import com.hotspot.global.oauth.dto.OAuthMemberDto
import com.hotspot.global.service.WebClientService
import com.hotspot.member.dto.*
import com.hotspot.member.entity.BlockedMember
import com.hotspot.member.entity.Member
import com.hotspot.member.repository.BlockedMemberRepository
import com.hotspot.member.repository.MemberRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.messaging.handler.annotation.Payload
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
        private val kafkaTemplate: KafkaTemplate<String, Any>,
        private val objectMapper: ObjectMapper,

        @Value("\${LIVE_CHAT_URL}")
        private val liveChatURL: String,

        ) : WebClientService() {

    fun createMember(oAuthMemberDto: OAuthMemberDto): Member {
        val member = memberRepository.save(Member.create(oAuthMemberDto))
        val maxRetries = 3 // 최대 재시도 횟수

        retryWithBackoff(webClient, HttpMethod.POST, "$liveChatURL/chatting-member", ChattingMemberReqDto.create(member), maxRetries, ChattingMemberResDto::class.java)

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
        val maxRetries = 3 // 최대 재시도 횟수

        retryWithBackoff(webClient, HttpMethod.PATCH, "$liveChatURL/chatting-member", ChattingMemberReqDto.create(member), maxRetries, ChattingMemberResDto::class.java)


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

    fun getMemberInfo(memberIdList: List<Long>): MemberInfoResponseDto {
        val memberList = memberRepository.findByIdIn(memberIdList)
        return MemberInfoResponseDto(memberList.map { MemberInfoDto.create(it) }.toMutableList())
    }

    @KafkaListener(topics = ["TOPIC"])
    fun consume(@Payload data: String): String {
        println(data)
        val testDto = TestDto.create(data)
        val jsonValue = objectMapper.writeValueAsString(testDto)
        kafkaTemplate.send("TEST_RETURN", jsonValue)
        return "Message: $data"
    }
}