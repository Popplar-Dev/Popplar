package com.hotspot.member.service

import com.hotspot.member.dto.MemberProfileResDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class CryptService (

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

    fun decrypt(id: Long): Long {
        return id / (saltA * saltB * saltC)
    }
}