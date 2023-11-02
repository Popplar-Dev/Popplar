package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.dto.OAuthLoginReqDto
import com.hotspot.global.oauth.service.OAuthServiceFactory
import com.hotspot.member.service.CryptService
import com.hotspot.member.service.MemberService
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member")
class MemberController(
    private val memberService: MemberService,
    private val oAuthServiceFactory: OAuthServiceFactory,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
    private val cryptService: CryptService,
) {

    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                .process(oAuthLoginReqDto.accessToken)
        )
    }

    @GetMapping("/{memberId}")
    fun getMemberProfile(@PathVariable memberId: Long): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            memberService.getMemberProfile(memberId)
        )
    }

    // TODO
    //  본인 검증 로직 추가 필요
    @PatchMapping("/{memberId}")
    fun updateMemberProfile(
        @PathVariable memberId: Long,
        @RequestBody memberUpdateReqDto: MemberUpdateReqDto
    ): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            memberService.updateMemberProfile(
                memberId,
                memberUpdateReqDto
            )
        )
    }

    // TODO
    //  본인 검증 로직 추가 필요
    @DeleteMapping("/{memberId}")
    fun deleteMember(@PathVariable memberId: Long) {
        memberService.deleteMember(memberId)
    }

    // TODO
    //  본인 검증 로직 추가 필요
    @PostMapping("/block/{memberId}/{blockedMemberId}")
    fun blockMember(@PathVariable memberId: Long, @PathVariable blockedMemberId: Long) {
        memberService.blockMember(memberId, blockedMemberId)
    }

    // TODO
    //  본인 검증 로직 추가 필요
    @DeleteMapping("/block/{memberId}/{blockedMemberId}")
    fun unBlockMember(@PathVariable memberId: Long, @PathVariable blockedMemberId: Long) {
        memberService.unBlockMember(memberId, blockedMemberId)
    }

    // TODO
    //  스탬프 추가 로직 필요 (스탬프 추가 시 핫플레이스 서버에 방문자 추가 요청)
}