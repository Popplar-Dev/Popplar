package com.hotspot.member.service

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.mapper.MemberMapper
import com.hotspot.member.repository.MemberRepository
import org.springframework.stereotype.Service

@Service
class MemberService (
    private val memberRepository: MemberRepository,
){

    fun getMemberProfile(id: Long): MemberProfileResDto {
        return MemberMapper.INSTANCE.entityToMemberProfileDto(findMemberById(id));
    }

    fun findMemberById(id: Long): Member {
        return memberRepository.findById(id)
            .orElseThrow {throw ArithmeticException("사용자 정보가 없습니다.")};
    }

}