package com.hotspot.member.service

import com.hotspot.member.dto.MessageResDto
import com.hotspot.member.entity.Member
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
    fun getMessage(myId: Long, messageId: Long): MessageResDto {
        val message = findMessage(messageId)

        message.check()

        // TODO
        //  내가 보낸 메세지 확인 하는 get 추가 필요

        if (myId != message.sentMemberId) {
            throw RuntimeException("쪽지 열람 권한이 없습니다.")
        }

        val sentMember = findMember(message.sentMemberId)
        val receivedMember = findMember(message.receivedMemberId)


        return MessageResDto.create(cryptService, message, sentMember, receivedMember)
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
    fun deleteMessage(myId: Long, messageId: Long) {
        val message = findMessage(messageId)
        if (myId != message.receivedMemberId) {
            throw RuntimeException("쪽지 삭제 권한이 없습니다")
        }
        message.delete()
    }

    fun getMyMessageList(receivedMemberId: Long): MutableList<MessageResDto> {
        val messageList =
            messageRepository.findAllByReceivedMemberIdAndDeletedFalse(receivedMemberId)

        return messageList.map {
            val sentMember = findMember(it.sentMemberId)
            val receivedMember = findMember(it.receivedMemberId)

            MessageResDto.create(cryptService, it, sentMember, receivedMember)
        }.toMutableList()
    }

    @Transactional
    fun deleteMultiMessage(
        memberId: Long,
        messageIdList: ArrayList<Long>
    ): MutableList<MessageResDto> {

        val member = findMember(memberId)

        messageIdList.map {
            val message = findMessage(it)
            if (member.id != message.receivedMemberId) {
                throw RuntimeException("삭제 권한이 없습니다.")
            }
            message.delete()
        }

        return getMyMessageList(memberId)
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