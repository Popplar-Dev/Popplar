package com.hotspot.global.oauth.service.impl

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.dto.OAuthCodeDto
import com.hotspot.global.oauth.dto.OAuthMemberDto
import com.hotspot.global.oauth.dto.OAuthTokenDto
import com.hotspot.global.oauth.service.JWTService
import com.hotspot.global.oauth.service.OAuthService
import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.repository.MemberRepository
import com.hotspot.member.service.CryptService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient

@Service
@Transactional
class KakaoOAuthService(

    private val webClient: WebClient,
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
    private val jwtService: JWTService,

    @Value("\${KAKAO_RESTAPI_KEY}")
    private val KAKAO_RESTPAPI_KEY: String,
    @Value("\${KAKAO_REDIRECT_URL}")
    private val KAKAO_REDIRECT_URL: String,
) : OAuthService {
    override fun getSocialType(): SocialType {
        return SocialType.KAKAO
    }

    override fun getAccessToken(code: String): OAuthTokenDto {
        val getTokenURL =
            ("https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id="
                    + KAKAO_RESTPAPI_KEY + "&redirect_uri=" + KAKAO_REDIRECT_URL + "&code="
                    + code)
        return webClient.post()
            .uri(getTokenURL)
            .retrieve()
            .bodyToMono(OAuthTokenDto::class.java).block()
            ?: throw RuntimeException("카카오 억세스 토큰 접근 실패")
    }

    override fun getUser(accessToken: String): OAuthMemberDto {
        val getUserURL = "https://kapi.kakao.com/v2/user/me"

        val oAuthCodeDto = webClient.post()
            .uri(getUserURL)
            .header("Authorization", "Bearer $accessToken")
            .retrieve()
            .bodyToMono(OAuthCodeDto::class.java)
            .block() ?: throw RuntimeException("카카오 유저 정보 접근 실패")
        return OAuthMemberDto(
            socialType = getSocialType(),
            socialId = oAuthCodeDto.authenticationCode,
        )
    }

    override fun login(oAuthMemberDto: OAuthMemberDto): Member {
        return memberRepository.findBySocialIdAndDeletedFalse(oAuthMemberDto.socialId) ?: memberRepository.save(Member.create(oAuthMemberDto))
    }

    override fun generateJWT(member: Member): MemberProfileResDto {
        return MemberProfileResDto.create(cryptService, member).insertJWT(jwtService.createAccessToken(member))
    }
}