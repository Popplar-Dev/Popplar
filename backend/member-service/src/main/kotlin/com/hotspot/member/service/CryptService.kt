package com.hotspot.member.service

import com.hotspot.member.dto.MemberProfileResDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.ByteBuffer
import java.util.*
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.SecretKeySpec


@Service
@Transactional(readOnly = true)
class CryptService (

    @Value("\${ALGORITHM}")
    private val ALGORITHM: String,
    @Value("\${SECRET}")
    private val SECRET: String,

    @Value("\${SALT_A}")
    private val saltA: Long,
    @Value("\${SALT_B}")
    private val saltB: Long,
    @Value("\${SALT_C}")
    private val saltC: Long,
){

    fun encrypt(memberProfileResDto: MemberProfileResDto): MemberProfileResDto {
        return memberProfileResDto.encrypt(saltA, saltB, saltC)
    }

    fun decrypt(memberProfileResDto: MemberProfileResDto): MemberProfileResDto {
        return memberProfileResDto.decrypt(saltA, saltB, saltC)
    }
}