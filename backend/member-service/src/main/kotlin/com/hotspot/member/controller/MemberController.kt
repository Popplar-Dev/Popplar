package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.dto.MemberUpdateReqDto
import com.hotspot.member.entity.SocialType
import com.hotspot.member.oauth.OAuthLoginReqDto
import com.hotspot.member.oauth.service.OAuthServiceFactory
import com.hotspot.member.service.CryptService
import com.hotspot.member.service.MemberService
import lombok.RequiredArgsConstructor
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
class MemberController(
    private val memberService: MemberService,
    private val oAuthServiceFactory: OAuthServiceFactory,
    private val cryptService: CryptService,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
) {

    // 테스트용 코드
    @GetMapping("/login")
    fun loginTest(@RequestParam code: String): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            cryptService.encrypt(
                oAuthServiceFactory.getOauthService(SocialType.GOOGLE).process(code)
            )
        )
    }

    @PostMapping("/login")
    fun login(@RequestBody oAuthLoginReqDto: OAuthLoginReqDto): EntityModel<MemberProfileResDto> {
        // TODO JWT 생성 로직 추가 필요
        return memberProfileResDtoRA.toModel(
            cryptService.encrypt(
                oAuthServiceFactory.getOauthService(oAuthLoginReqDto.loginType)
                    .process(oAuthLoginReqDto.code)
            )
        )
    }

    @GetMapping("/{memberId}")
    fun getMemberProfile(@PathVariable memberId: Long): EntityModel<MemberProfileResDto> {
        return memberProfileResDtoRA.toModel(
            cryptService.encrypt(memberService.getMemberProfile(memberId))
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
            cryptService.encrypt(
                memberService.updateMemberProfile(
                    memberId,
                    memberUpdateReqDto
                )
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
}