package com.popplar.apigateway.jwt.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.nio.charset.StandardCharsets;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {

    public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    @Value("${SALT}")
    private String SALT;

    private byte[] generateKey() {
        byte[] key;
        key = SALT.getBytes(StandardCharsets.UTF_8);
        return key;
    }

    @Override
    public boolean checkToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey())
                .parseClaimsJws(jwt);
            logger.debug("claims: {}", claims);
            return true;
        } catch (SignatureException | MalformedJwtException ex) {
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
    public Claims get(String key) {
        Claims claim = parseClaims(key);
        System.out.println("토큰 받은거 해석");
        System.out.println(claim);
        return parseClaims(key);
    }

    @Override
    public long getMemberIdFromAccessToken(String accessToken) {
        Jws<Claims> claims;
        try {
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(accessToken);
        } catch (Exception e) {
            logger.error(e.getMessage());
            //TODO: UnAuthorized 예외로 바꿔서 처리해야함요
            throw new ArithmeticException();
        }
        return claims.getBody().get("id", Long.class);
    }

    @Override
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser()
                .setSigningKey(SALT.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(accessToken)
                .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
