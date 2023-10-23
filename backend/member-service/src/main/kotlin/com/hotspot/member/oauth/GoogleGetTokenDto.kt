package com.hotspot.member.oauth

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.beans.factory.annotation.Value

class GoogleGetTokenDto(

    val code: String,

    @JsonProperty("client_id")
    val clientId: String,

    @JsonProperty("client_secret")
    val clientSecret: String,

    @JsonProperty("redirect_uri")
    val redirectUri: String,

    @JsonProperty("grant_type")
    val grantType: String = "authorization_code",
)