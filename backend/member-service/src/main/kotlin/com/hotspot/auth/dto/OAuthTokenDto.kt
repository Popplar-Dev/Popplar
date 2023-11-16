package com.hotspot.auth.dto

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthTokenDto(
    @JsonProperty("access_token")
    val accessToken: String,

    @JsonProperty("refresh_token")
    val refreshToken: String? = null,
)