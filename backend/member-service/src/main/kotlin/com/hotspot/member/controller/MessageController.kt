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

    @GetMapping("/{memberId}/{messageId}")
    fun getMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable memberId: Long,
        @PathVariable messageId: Long
    ): ResponseEntity<MessageResDto> {
        authService.checkAuth(memberId, myId)
        return ResponseEntity<MessageResDto>(
            messageService.getMessage(myId, messageId),
            HttpStatus.OK
        )
    }

    @PostMapping("/{sentMemberId}/{receivedMemberId}")
    fun postMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable sentMemberId: Long,
        @PathVariable receivedMemberId: Long,
        @RequestBody messageReqDto: MessageReqDto,
    ) {
        authService.checkAuth(sentMemberId, myId)
        messageService.postMessage(sentMemberId, receivedMemberId, messageReqDto.content)
    }

    @DeleteMapping("/{memberId}/{messageId}")
    fun deleteMessage(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable memberId: Long,
        @PathVariable messageId: Long
    ) {
        authService.checkAuth(memberId, myId)
        messageService.deleteMessage(myId, messageId)
    }

    @GetMapping("/find-all/{memberId}")
    fun getMyMessageList(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable memberId: Long,
    ): ResponseEntity<MutableList<MessageResDto>> {
        authService.checkAuth(memberId, myId)
        return ResponseEntity<MutableList<MessageResDto>>(
            messageService.getMyMessageList(myId.toLong()),
            HttpStatus.OK
        )
    }

    // TODO
    //  일괄 삭제 API 필요

    @DeleteMapping("/multi")
    fun deleteMultiMessage(
        @RequestHeader("Member-Id") myId: Long,
        @RequestHeader("Id-List") messageIdList: ArrayList<Long>
    ) {
        messageService.deleteMultiMessage(myId, messageIdList)
    }
}