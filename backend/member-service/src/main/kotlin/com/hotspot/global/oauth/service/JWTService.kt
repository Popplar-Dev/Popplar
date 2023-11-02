package com.hotspot.global.oauth.service

import com.hotspot.member.entity.Member
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.nio.charset.StandardCharsets
import java.util.*

@Service
class JWTService(

    @Value("\${SALT}")
    private val SALT: String,
    private val ACCESS_TOKEN_EXPIRE_MINUTES: Int = 1,
    private val REFRESH_TOKEN_EXPIRE_MINUTES: Int = 2,
) {

    fun createAccessToken(member: Member): String {
        return create(
            member, "access-token",
            1000 * 60 * 60 * 24 * 7 * ACCESS_TOKEN_EXPIRE_MINUTES
        )
    }

    fun createRefreshToken(member: Member): String {
        return create(
            member, "refresh-token",
            1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES
        )
    }

    fun create(member: Member, subject: String, expire: Int): String {
        val key = Keys.hmacShaKeyFor(SALT.toByteArray(StandardCharsets.UTF_8))
        val claims: Claims = Jwts.claims()
            .setSubject(subject)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + expire))
        claims["memberId"] = member.id
        claims["memberName"] = member.name
        return Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setSubject(subject)
            .setClaims(claims)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }
}