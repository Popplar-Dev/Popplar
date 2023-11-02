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
        val message = findMessage(messageId)

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

    @Transactional
    fun deleteMessage(messageId: Long) {
        findMessage(messageId).delete()
    }

    fun getMyMessageList(receivedMemberId: Long): MutableList<MessageResDto> {
        val decryptedReceivedMemberId = cryptService.decrypt(receivedMemberId)
        val messageList =
            messageRepository.findAllByReceivedMemberIdAndDeletedFalse(decryptedReceivedMemberId)


        return messageList.stream().map {
            val sentMember = findMember(it.sentMemberId)
            val receivedMember = findMember(it.receivedMemberId)

            MessageResDto.create(it, sentMember, receivedMember)
        }.toList()!!
    }

    fun findMessage(messageId: Long): Message {
        return messageRepository.findByIdAndDeletedFalse(messageId)
            ?: throw RuntimeException("찾는 쪽지가 없습니다.")
    }

    fun findMember(memberId: Long): Member {
        return memberRepository.findById(memberId)
            .orElseThrow { throw RuntimeException("찾는 회원이 없습니다.") }
    }
}