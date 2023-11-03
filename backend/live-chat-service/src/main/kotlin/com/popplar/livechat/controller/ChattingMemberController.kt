package com.popplar.livechat.controller

import com.popplar.livechat.dto.ChattingMemberReqDto
import com.popplar.livechat.service.ChattingMemberService
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/live-chat/chatting-member")
class ChattingMemberController (
    private val chattingMemberService: ChattingMemberService
){

    @PostMapping
    fun createChattingMember(@RequestBody chattingMemberReqDto: ChattingMemberReqDto) {
        chattingMemberService.createChattingMember(chattingMemberReqDto)
    }

    @PatchMapping
    fun updateChattingMember(@RequestBody chattingMemberReqDto: ChattingMemberReqDto) {
        println(chattingMemberReqDto.memberId)
        println(chattingMemberReqDto.memberName)
        chattingMemberService.updateChattingMember(chattingMemberReqDto)
    }

}