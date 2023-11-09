package com.popplar.gameservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class CryptService {

    @Value("${SALT_A}")
    private Long saltA;
    @Value("${SALT_B}")
    private Long saltB;
    @Value("${SALT_C}")
    private Long saltC;

    public Long encrypt(Long memberId) {
        return memberId * saltA * saltB * saltC;
    }

    public Long decrypt(Long encryptedId) {
        return encryptedId / (saltA * saltB * saltC);
    }
}
