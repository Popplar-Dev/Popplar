package com.popplar.apigateway.jwt.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {

    public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    @Value("${SALT_KEY}")
    private String SALT;

    private SecretKey generateKey() {
        byte[] keyBytes = SALT.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public boolean checkToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().verifyWith(this.generateKey()).build()
                .parseSignedClaims(jwt);
            logger.debug("claims: {}", claims);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("잘못된 JWT 서명입니다");
        } catch (ExpiredJwtException ex) {
            log.error("만료된 JWT 토큰입니다");
        } catch (UnsupportedJwtException ex) {
            log.error("지원하지 않는 JWT 토큰입니다");
        } catch (IllegalArgumentException ex) {
            log.error("JWT 토큰이 비어있습니다");
        }
        return false;
    }

    @Override
    public String getMemberIdFromAccessToken(String accessToken) {
        try {
            Claims claims = Jwts.parser()
                .verifyWith(this.generateKey())
                .build().parseSignedClaims(accessToken).getPayload();

            return claims.get("id", String.class);
        } catch (Exception e) {
            logger.error(e.getMessage());
            //TODO: UnAuthorized 예외로 바꿔서 처리해야함요
            throw new ArithmeticException();
        }
    }

    @Override
    public Object parseClaims(String accessToken) {
        try {
            return Jwts.parser()
                .verifyWith(this.generateKey())
                .build()
                .parse(accessToken).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
