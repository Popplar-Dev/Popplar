package com.hotspot.member.controller

import com.hotspot.member.dto.MessageReqDto
import com.hotspot.member.dto.MessageResDto
import com.hotspot.member.service.MessageService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/message")
class MessageController (

    private val messageService: MessageService,
){

    // TODO
    //  게이트웨이에서 받은 헤더로 받은 사람이 본인인지 확인 로직 필요

    // TODO
    //  messageResDto profileImg 추가 필요

    @GetMapping("/{messageId}")
    fun getMessage(@PathVariable messageId: Long): MessageResDto {
        return messageService.getMessage(messageId)
    }

    @PostMapping("/{sentMemberId}/{receivedMemberId}")
    fun postMessage(
        @PathVariable sentMemberId: Long,
        @PathVariable receivedMemberId: Long,
        @RequestBody messageReqDto: MessageReqDto,
    ) {
        messageService.postMessage(sentMemberId, receivedMemberId, messageReqDto.content)
    }

    @DeleteMapping("/{messageId}")
    fun deleteMessage(@PathVariable messageId: Long) {
        messageService.deleteMessage(messageId)
    }

    @GetMapping("/find-all")
    fun getMyMessageList(): MutableList<MessageResDto> {
        // TODO
        //  헤더 처리 전 테스트용 멤버 아이디
        val testMemberId = 356931964684L

        return messageService.getMyMessageList(testMemberId)

    }
}