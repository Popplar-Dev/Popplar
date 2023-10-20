package com.hotspot.member.oauth.service

import com.hotspot.member.entity.SocialType
import org.springframework.stereotype.Component

@Component
class OAuthServiceFactory(
    private val oAuthServiceList: List<OAuthService>,
) {
    private val oauthServiceMap: MutableMap<SocialType, OAuthService> = mutableMapOf()
    init {
        oAuthServiceList.forEach {
            oauthServiceMap[it.getSocialType()] = it
        }
    }

    fun getOauthService(socialType: SocialType): OAuthService {
        return oauthServiceMap[socialType] ?: throw RuntimeException("서비스 불가능한 로그인 타입")
    }
}