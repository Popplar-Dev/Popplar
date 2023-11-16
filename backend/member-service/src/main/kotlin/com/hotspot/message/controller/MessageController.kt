package com.hotspot.message.controller

import com.hotspot.message.dto.MessageReqDto
import com.hotspot.message.dto.MessageResDto
import com.hotspot.message.service.MessageService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member/message")
class MessageController(

    private val messageService: MessageService,
) {

    /**
     * 쪽지 확인 API
     */
    @GetMapping("/{messageId}")
    fun getMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable messageId: Long
    ): ResponseEntity<MessageResDto> {
        return ResponseEntity<MessageResDto>(
            messageService.getMessage(myId, messageId),
            HttpStatus.OK
        )
    }

    /**
     * 쪽지 삭제 API
     */
    @PostMapping("/{receivedMemberId}")
    fun postMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable receivedMemberId: Long,
        @RequestBody messageReqDto: MessageReqDto,
    ) {
        messageService.postMessage(myId, receivedMemberId, messageReqDto.content)
    }

    /**
     * 받은 쪽지 리스트 조회 API
     */
    @GetMapping("/received-all")
    fun getMyReceivedMessageList(
        @RequestHeader("Member-Id") myId: Long,
    ): ResponseEntity<MutableList<MessageResDto>> {
        return ResponseEntity<MutableList<MessageResDto>>(
            messageService.getMyReceivedMessageList(myId),
            HttpStatus.OK
        )
    }

    /**
     * 보낸 쪽지 리스트 조회 API
     */
    @GetMapping("/sent-all")
    fun getMySentMessageList(
        @RequestHeader("Member-Id") myId: Long,
    ): ResponseEntity<MutableList<MessageResDto>> {
        return ResponseEntity<MutableList<MessageResDto>>(
            messageService.getMySentMessageList(myId),
            HttpStatus.OK
        )
    }

    /**
     * 체크한 쪽지 삭제 API
     */
    @DeleteMapping("/multi")
    fun deleteMultiMessage(
        @RequestHeader("Member-Id") myId: Long,
        @RequestHeader("Id-List") messageIdList: ArrayList<Long>
    ) {
        messageService.deleteMultiMessage(myId, messageIdList)
    }
}