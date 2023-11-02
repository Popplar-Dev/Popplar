package com.hotspot.auth.service

import org.springframework.stereotype.Service

@Service
class AuthService {
    fun checkAuth(memberId: Long, myId: String) {
        if (memberId != myId.toLong())
            throw RuntimeException("접근 권한이 없습니다.")
    }
}