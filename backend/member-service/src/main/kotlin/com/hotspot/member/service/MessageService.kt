package com.hotspot.member.service

import com.hotspot.member.entity.Message
import com.hotspot.member.repository.MessageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class MessageService(

    private val messageRepository: MessageRepository,
    private val cryptService: CryptService,
) {

    @Transactional
    fun postMessage(sentMemberId: Long, receivedMemberId: Long, content: String) {
        val decryptedSentMemberId = cryptService.decrypt(sentMemberId)
        val decryptedReceivedMemberId = cryptService.decrypt(receivedMemberId)
        messageRepository.save(Message.create(decryptedSentMemberId, decryptedReceivedMemberId, content))
    }
}