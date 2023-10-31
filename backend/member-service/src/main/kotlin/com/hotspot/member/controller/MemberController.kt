package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.OAuthLoginReqDto
import com.hotspot.global.oauth.service.OAuthServiceFactory
import com.hotspot.achievement.service.AchievementService
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

    // 테스트용 코드
    @GetMapping("/login")
    fun loginTest(@RequestParam code: String): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            oAuthServiceFactory.getOauthService(SocialType.GOOGLE).process(cryptService, code)
        )
    }

    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        // TODO JWT 생성 로직 추가 필요
        return memberProfileResDtoRA.toModel(
            oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                .process(cryptService, oAuthLoginReqDto.code)
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