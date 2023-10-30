package com.hotspot.member.oauth.service.impl

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.member.oauth.GoogleGetTokenDto
import com.hotspot.member.oauth.OAuthCodeDto
import com.hotspot.member.oauth.OAuthMember
import com.hotspot.member.oauth.OAuthTokenDto
import com.hotspot.member.oauth.service.OAuthService
import com.hotspot.member.repository.MemberRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient

@Service
@Transactional(readOnly = true)
class GoogleOAuthService(

    private val webClient: WebClient,
    private val memberRepository: MemberRepository,
    @Value("\${GOOGLE_CLIENT_ID}")
    private val GOOGLE_CLIENT_ID: String,
    @Value("\${GOOGLE_CLIENT_SECRET}")
    private val GOOGLE_CLIENT_SECRET: String,
    @Value("\${GOOGLE_REDIRECT_URI}")
    private val GOOGLE_REDIRECT_URI: String,
) : OAuthService {

    override fun getSocialType(): SocialType {
        return SocialType.GOOGLE
    }

    override fun getAccessToken(code: String): OAuthTokenDto {
        val getTokenURL = "https://oauth2.googleapis.com/token"

        val googleGetTokenDto = GoogleGetTokenDto(
            code = code,
            clientId = GOOGLE_CLIENT_ID,
            clientSecret = GOOGLE_CLIENT_SECRET,
            redirectUri = GOOGLE_REDIRECT_URI,
        )
        return webClient.post()
            .uri(getTokenURL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(googleGetTokenDto) // bodyValue 사용
            .retrieve()
            .bodyToMono(OAuthTokenDto::class.java)
            .block()
            ?: throw RuntimeException("구글 억세스 토큰 접근 실패")
    }

    override fun getUser(accessToken: String): OAuthMember {
        val getUserURL = "https://www.googleapis.com/oauth2/v2/userinfo"

        val oAuthCodeDto = webClient.get()
            .uri(getUserURL)
            .header("Authorization", "Bearer $accessToken")
            .retrieve()
            .bodyToMono(OAuthCodeDto::class.java)
            .block() ?: throw RuntimeException("구글 유저 정보 접근 실패")
        return OAuthMember(
            socialType = getSocialType(),
            socialId = oAuthCodeDto.authenticationCode,
        )
    }

    @Transactional
    override fun login(oAuthMember: OAuthMember): Member {
        return memberRepository.findBySocialIdAndDeletedFalse(oAuthMember.socialId)
            ?: memberRepository.save(Member.create(oAuthMember))
    }
}