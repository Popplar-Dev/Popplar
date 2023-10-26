package com.hotspot.member.controller

import com.hotspot.member.assembler.MemberProfileResDtoRA
import com.hotspot.member.dto.*
import com.hotspot.member.entity.SocialType
import com.hotspot.member.oauth.OAuthLoginReqDto
import com.hotspot.member.oauth.service.OAuthServiceFactory
import com.hotspot.member.service.AchievementService
import com.hotspot.member.service.CryptService
import com.hotspot.member.service.MemberService
import com.hotspot.member.service.MessageService
import org.springframework.hateoas.EntityModel
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member")
class MemberController(
    private val memberService: MemberService,
    private val achievementService: AchievementService,
    private val oAuthServiceFactory: OAuthServiceFactory,
    private val cryptService: CryptService,
    private val memberProfileResDtoRA: MemberProfileResDtoRA,
    private val messageService: MessageService,
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

    @GetMapping("/stamp/{memberId}")
    fun getMemberCategoryCountList(@PathVariable memberId: Long): MutableList<MemberCategoryCountResDto> {
        return achievementService.getMemberCategoryCountList(memberId)
    }

    // TODO
    //  스탬프 추가 로직 필요 (스탬프 추가 시 핫플레이스 서버에 방문자 추가 요청)

    @GetMapping("/message/{messageId}")
    fun getMessage(@PathVariable messageId: Long): MessageResDto {
        // TODO
        //  게이트웨이에서 받은 헤더로 받은 사람이 본인인지 확인 로직 필요
        return messageService.getMessage(messageId)
    }

    @PostMapping("/message/{sentMemberId}/{receivedMemberId}")
    fun postMessage(
        @PathVariable sentMemberId: Long,
        @PathVariable receivedMemberId: Long,
        @RequestBody messageReqDto: MessageReqDto,
    ) {
        messageService.postMessage(sentMemberId, receivedMemberId, messageReqDto.content)
    }

}