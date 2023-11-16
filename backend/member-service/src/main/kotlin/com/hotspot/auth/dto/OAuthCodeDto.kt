package com.hotspot.auth.dto

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthCodeDto(
    @JsonProperty("id")
    val authenticationCode: String,
)