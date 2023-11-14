package com.hotspot.member.controller

import com.hotspot.auth.service.AuthService
import com.hotspot.member.dto.MessageReqDto
import com.hotspot.member.dto.MessageResDto
import com.hotspot.member.service.MessageService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member/message")
class MessageController(

    private val messageService: MessageService,
    private val authService: AuthService,
) {

    // TODO
    //  messageResDto profileImg 추가 필요

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

    @PostMapping("/{receivedMemberId}")
    fun postMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable receivedMemberId: Long,
        @RequestBody messageReqDto: MessageReqDto,
    ) {
        messageService.postMessage(myId, receivedMemberId, messageReqDto.content)
    }

    @DeleteMapping("/{messageId}")
    fun deleteMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable messageId: Long
    ) {
        messageService.deleteMessage(myId, messageId)
    }

    @GetMapping("/find-all")
    fun getMyMessageList(
        @RequestHeader("Member-Id") myId: Long,
    ): ResponseEntity<MutableList<MessageResDto>> {
        return ResponseEntity<MutableList<MessageResDto>>(
            messageService.getMyMessageList(myId),
            HttpStatus.OK
        )
    }

    @DeleteMapping("/multi")
    fun deleteMultiMessage(
        @RequestHeader("Member-Id") myId: Long,
        @RequestHeader("Id-List") messageIdList: ArrayList<Long>
    ) {
        messageService.deleteMultiMessage(myId, messageIdList)
    }
}