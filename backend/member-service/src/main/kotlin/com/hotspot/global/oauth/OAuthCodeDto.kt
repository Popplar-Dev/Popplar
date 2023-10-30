package com.hotspot.global.oauth

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthCodeDto(
    @JsonProperty("id")
    val authenticationCode: String,
)