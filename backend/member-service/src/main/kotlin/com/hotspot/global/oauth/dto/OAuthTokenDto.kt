package com.hotspot.global.oauth

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthTokenDto(
    @JsonProperty("access_token")
    val accessToken: String,

    @JsonProperty("refresh_token")
    val refreshToken: String? = null,
)