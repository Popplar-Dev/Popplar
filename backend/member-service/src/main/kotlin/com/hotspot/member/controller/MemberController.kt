package com.hotspot.member.controller

import com.hotspot.auth.service.AuthService
import com.hotspot.member.dto.*
import com.hotspot.member.service.MemberService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member")
class MemberController(
        private val memberService: MemberService,
        private val authService: AuthService,
) {

    @GetMapping("/{memberId}")
    fun getMemberProfile(@PathVariable memberId: Long): ResponseEntity<MemberProfileResDto> {
        return ResponseEntity<MemberProfileResDto>(memberService.getMemberProfile(memberId), HttpStatus.OK)
    }

    @PatchMapping("/{memberId}")
    fun updateMemberProfile(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable memberId: Long,
            @RequestBody memberUpdateReqDto: MemberUpdateReqDto
    ): ResponseEntity<MemberProfileResDto> {
        authService.checkAuth(memberId, myId)
        return ResponseEntity<MemberProfileResDto>(memberService.updateMemberProfile(
                memberId,
                memberUpdateReqDto
        ), HttpStatus.OK)
    }

    @DeleteMapping("/{memberId}")
    fun deleteMember(@RequestHeader("Member-Id") myId: String, @PathVariable memberId: Long) {
        authService.checkAuth(memberId, myId)
        memberService.deleteMember(memberId)
    }

    @PostMapping("/block/{blockedMemberId}")
    fun blockMember(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable memberId: Long,
            @PathVariable blockedMemberId: Long
    ) {
        authService.checkAuth(memberId, myId)
        memberService.blockMember(memberId, blockedMemberId)
    }

    @DeleteMapping("/block/{memberId}/{blockedMemberId}")
    fun unBlockMember(@RequestHeader("Member-Id") myId: String, @PathVariable memberId: Long, @PathVariable blockedMemberId: Long) {
        authService.checkAuth(memberId, myId)
        memberService.unBlockMember(memberId, blockedMemberId)
    }

    @PostMapping("/info")
    fun getMemberInfoList(@RequestBody memberIdList: List<Long>): ResponseEntity<MemberInfoResponseDto> {
        return ResponseEntity<MemberInfoResponseDto>(memberService.getMemberInfo(memberIdList),HttpStatus.OK)
    }
}