package com.hotspot.member.oauth

import com.fasterxml.jackson.annotation.JsonProperty

class OAuthCodeDto(
    @JsonProperty("id")
    val authenticationCode: String,
)