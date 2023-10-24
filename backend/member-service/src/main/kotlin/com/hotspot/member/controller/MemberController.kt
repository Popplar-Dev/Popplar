package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.dto.MemberUpdateReqDto
import com.hotspot.member.entity.SocialType
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

    @GetMapping("/login")

    fun login(@RequestParam code: String): EntityModel<MemberProfileResDto> {
        // TODO
        //  프론트 완성 전 임시로 code만 받음
        //  추후 class 생성해서 code, type post로 받도록 해야 함
        //  JWT 발급 로직 추가 필요

        return memberProfileResDtoRA.toModel(
            cryptService.encrypt(
                oAuthServiceFactory.getOauthService(SocialType.GOOGLE).process(code)
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
}