package com.hotspot.auth.service

import com.hotspot.member.service.CryptService
import org.springframework.stereotype.Service

@Service
class AuthService (
    private val cryptService: CryptService
){
    fun checkAuth(memberId: Long, myId: String) {
        if (cryptService.decrypt(memberId) != myId.toLong())
            throw RuntimeException("접근 권한이 없습니다.")
    }
}