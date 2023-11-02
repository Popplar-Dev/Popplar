package com.hotspot.global.oauth.dto

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthCodeDto(
    @JsonProperty("id")
    val authenticationCode: String,
)