package com.hotspot.member.service

import com.hotspot.member.dto.MessageResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.entity.Message
import com.hotspot.member.repository.MemberRepository
import com.hotspot.member.repository.MessageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.streams.toList

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

        val sentMember = findMember(message.sentMemberId)
        val receivedMember = findMember(message.receivedMemberId)


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

    fun getMyMessageList(receivedMemberId: Long): MutableList<MessageResDto> {
        val decryptedReceivedMemberId = cryptService.decrypt(receivedMemberId)
        val messageList =
            messageRepository.findAllByReceivedMemberId(decryptedReceivedMemberId)


        return messageList.stream().map {
            val sentMember = findMember(it.sentMemberId)
            val receivedMember = findMember(it.receivedMemberId)

            MessageResDto(
                sentMember.id!!,
                if (sentMember.deleted) "탈퇴 회원" else sentMember.name,
                receivedMember.id!!,
                receivedMember.name,
                it.content,
                it.checked
            )
        }.toList()!!
    }

    fun findMember(memberId: Long): Member {
        return memberRepository.findById(memberId)
            .orElseThrow { throw RuntimeException("찾는 회원이 없습니다.") }
    }
}