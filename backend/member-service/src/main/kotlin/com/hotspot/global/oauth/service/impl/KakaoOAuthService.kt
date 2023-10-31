package com.hotspot.global.oauth.service.impl

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.OAuthCodeDto
import com.hotspot.global.oauth.OAuthMember
import com.hotspot.global.oauth.OAuthTokenDto
import com.hotspot.global.oauth.service.OAuthService
import com.hotspot.member.repository.MemberRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient

@Service
@Transactional(readOnly = true)
class KakaoOAuthService(
    private val webClient: WebClient,
    private val memberRepository: MemberRepository,
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

    override fun getUser(accessToken: String): OAuthMember {
        val getUserURL = "https://kapi.kakao.com/v2/user/me"

        val oAuthCodeDto = webClient.post()
            .uri(getUserURL)
            .header("Authorization", "Bearer $accessToken")
            .retrieve()
            .bodyToMono(OAuthCodeDto::class.java)
            .block() ?: throw RuntimeException("카카오 유저 정보 접근 실패")
        return OAuthMember(
            socialType = getSocialType(),
            socialId = oAuthCodeDto.authenticationCode,
        )
    }

    @Transactional
    override fun login(oAuthMember: OAuthMember): Member {
        return memberRepository.findBySocialIdAndDeletedFalse(oAuthMember.socialId) ?: memberRepository.save(Member.create(oAuthMember))
    }
}