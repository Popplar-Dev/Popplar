package com.hotspot.member.controller

import com.hotspot.auth.service.AuthService
import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.member.service.MemberService
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member")
class MemberController(
    private val memberService: MemberService,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
    private val authService: AuthService,
) {

    @GetMapping("/{memberId}")
    fun getMemberProfile(@PathVariable memberId: Long): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            memberService.getMemberProfile(memberId)
        )
    }

    @PatchMapping("/{memberId}")
    fun updateMemberProfile(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable memberId: Long,
        @RequestBody memberUpdateReqDto: MemberUpdateReqDto
    ): EntityModel<MemberProfileResDto> {
        authService.checkAuth(memberId, myId)
        return memberProfileResDtoRA.toModel(
            memberService.updateMemberProfile(
                memberId,
                memberUpdateReqDto
            )
        )
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
}