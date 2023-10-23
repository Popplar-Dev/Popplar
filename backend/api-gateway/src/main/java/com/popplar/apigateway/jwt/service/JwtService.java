package com.popplar.apigateway.jwt.service;

import io.jsonwebtoken.Claims;

public interface JwtService {

    Claims get(String key);

    boolean checkToken(String jwt);

    long getMemberIdFromAccessToken(String accessToken);

    public Claims parseClaims(String accessToken);
}
