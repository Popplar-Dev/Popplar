package com.hotspot.global.oauth.service.impl

import com.hotspot.member.entity.Member
import com.hotspot.member.entity.SocialType
import com.hotspot.global.oauth.dto.GoogleGetTokenDto
import com.hotspot.global.oauth.dto.OAuthCodeDto
import com.hotspot.global.oauth.dto.OAuthMemberDto
import com.hotspot.global.oauth.dto.OAuthTokenDto
import com.hotspot.global.oauth.service.OAuthService
import com.hotspot.member.repository.MemberRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient

@Service
@Transactional
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

    override fun getUser(accessToken: String): OAuthMemberDto {
        val getUserURL = "https://www.googleapis.com/oauth2/v2/userinfo"

        val oAuthCodeDto = webClient.get()
            .uri(getUserURL)
            .header("Authorization", "Bearer $accessToken")
            .retrieve()
            .bodyToMono(OAuthCodeDto::class.java)
            .block() ?: throw RuntimeException("구글 유저 정보 접근 실패")
        return OAuthMemberDto(
            socialType = getSocialType(),
            socialId = oAuthCodeDto.authenticationCode,
        )
    }

    override fun login(oAuthMemberDto: OAuthMemberDto): Member {
        return memberRepository.findBySocialIdAndDeletedFalse(oAuthMemberDto.socialId)
            ?: memberRepository.save(Member.create(oAuthMemberDto))
    }
}