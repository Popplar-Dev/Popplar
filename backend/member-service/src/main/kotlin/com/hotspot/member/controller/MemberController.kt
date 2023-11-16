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

    /**
     * 회원 프로필 조회용 API
     */
    @GetMapping("/{memberId}")
    fun getMemberProfile(@PathVariable memberId: Long): ResponseEntity<MemberProfileResDto> {
        return ResponseEntity<MemberProfileResDto>(
            memberService.getMemberProfile(memberId),
            HttpStatus.OK
        )
    }

    /**
     * 회원 프로필 수정용 API
     */
    @PatchMapping("/{memberId}")
    fun updateMemberProfile(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable memberId: Long,
        @RequestBody memberUpdateReqDto: MemberUpdateReqDto
    ): ResponseEntity<MemberProfileResDto> {
        authService.checkAuth(memberId, myId)
        return ResponseEntity<MemberProfileResDto>(
            memberService.updateMemberProfile(
                memberId,
                memberUpdateReqDto
            ), HttpStatus.OK
        )
    }

    /**
     * 멤버 탈퇴용 API
     */
    @DeleteMapping("/{memberId}")
    fun deleteMember(@RequestHeader("Member-Id") myId: Long, @PathVariable memberId: Long) {
        authService.checkAuth(memberId, myId)
        memberService.deleteMember(memberId)
    }

    /**
     * 차단한 회원 조회용 API
     */
    @GetMapping("/block")
    fun getBlockedMember(
        @RequestHeader("Member-Id") myId: Long
    ): List<MemberProfileResDto> {
        return memberService.getBlockedMember(myId)
    }

    /**
     * 회원 차단 API
     */
    @PostMapping("/block/{blockedMemberId}")
    fun blockMember(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable blockedMemberId: Long
    ) {
        memberService.blockMember(myId, blockedMemberId)
    }

    /**
     * 회원 차단 취소 API
     */
    @DeleteMapping("/block/{blockedMemberId}")
    fun unBlockMember(
        @RequestHeader("Member-Id") myId: Long,
        @PathVariable blockedMemberId: Long
    ) {
        memberService.unBlockMember(myId, blockedMemberId)
    }

    /**
     * 여러 회원 정보 조회 API
     */
    @PostMapping("/info")
    fun getMemberInfoList(@RequestBody memberIdList: List<Long>): ResponseEntity<MemberInfoResponseDto> {
        return ResponseEntity<MemberInfoResponseDto>(
            memberService.getMemberInfo(memberIdList),
            HttpStatus.OK
        )
    }

    /**
     * 기존 회원 Firebase Alarm Token 변경 API
     */
    @PatchMapping("/firebase-token")
    fun updateFirebaseToken(
        @RequestHeader("Member-Id") memberId: Long,
        @RequestHeader("Firebase-Token") firebaseToken: String
    ): ResponseEntity<MemberProfileResDto> {
        return ResponseEntity<MemberProfileResDto>(
            memberService.updateFirebaseToken(
                memberId,
                firebaseToken
            ), HttpStatus.OK
        )
    }

    @GetMapping("/test")
    fun test(@RequestHeader("Member-Id") memberId: Long) {
        memberService.test(memberId)
    }
}