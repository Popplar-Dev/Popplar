package com.popplar.livechat.controller

import com.popplar.livechat.dto.ChattingMemberReqDto
import com.popplar.livechat.dto.ChattingMemberResDto
import com.popplar.livechat.service.ChattingMemberService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/live-chat/chatting-member")
class ChattingMemberController (
    private val chattingMemberService: ChattingMemberService
){

    @GetMapping("/{memberId}")
    fun getChattingMember(@PathVariable memberId:Long): ChattingMemberResDto {
        return chattingMemberService.getChattingMember(memberId)
    }

    @PostMapping
    fun createChattingMember(@RequestBody chattingMemberReqDto: ChattingMemberReqDto): ChattingMemberResDto {
        return chattingMemberService.createChattingMember(chattingMemberReqDto)
    }

    @PatchMapping
    fun updateChattingMember(@RequestBody chattingMemberReqDto: ChattingMemberReqDto): ChattingMemberResDto {
        return chattingMemberService.updateChattingMember(chattingMemberReqDto)
    }
}