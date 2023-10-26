package com.hotspot.member.service

import com.hotspot.member.dto.MessageResDto
import com.hotspot.member.entity.Message
import com.hotspot.member.repository.MemberRepository
import com.hotspot.member.repository.MessageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class MessageService(

    private val messageRepository: MessageRepository,
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
) {

    @Transactional
    fun getMessage(messageId: Long): MessageResDto {

        val message = messageRepository.findById(messageId)
            .orElseThrow { throw RuntimeException("메시지를 찾을 수 없습니다") }

        message.check()

        val sentMember = memberRepository.findById(message.sentMemberId)
            .orElseThrow { throw RuntimeException("송신 회원을 찾을 수 없습니다.") }
        val receivedMember = memberRepository.findById(message.receivedMemberId)
            .orElseThrow { throw RuntimeException("수신 회원을 찾을 수 없습니다.") }


        return MessageResDto.create(message, sentMember, receivedMember)
    }

    @Transactional
    fun postMessage(sentMemberId: Long, receivedMemberId: Long, content: String) {
        val decryptedSentMemberId = cryptService.decrypt(sentMemberId)
        val decryptedReceivedMemberId = cryptService.decrypt(receivedMemberId)
        messageRepository.save(
            Message.create(
                decryptedSentMemberId,
                decryptedReceivedMemberId,
                content
            )
        )
    }
}