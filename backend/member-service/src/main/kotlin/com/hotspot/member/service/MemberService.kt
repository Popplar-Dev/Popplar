package com.hotspot.member.service

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.dto.MemberUpdateReqDto
import com.hotspot.member.entity.Member
import com.hotspot.member.mapper.MemberMapper
import com.hotspot.member.repository.MemberRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class MemberService(
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
) {

    fun getMemberProfile(id: Long): MemberProfileResDto {
        val decryptedId = cryptService.decrypt(id)
        return MemberMapper.INSTANCE.entityToMemberProfileDto(findMemberById(decryptedId));
    }

    @Transactional
    fun updateMemberProfile(memberId: Long, memberUpdateReqDto: MemberUpdateReqDto): MemberProfileResDto {
        val decryptedId = cryptService.decrypt(memberId)
        val member = findMemberById(decryptedId)
        member.update(memberUpdateReqDto)
        return MemberMapper.INSTANCE.entityToMemberProfileDto(member)
    }

    @Transactional
    fun deleteMember(id: Long) {
        val decryptedId = cryptService.decrypt(id)
        val member = findMemberById(decryptedId)
        member.delete()
    }

    fun findMemberById(id: Long): Member {
        return memberRepository.findById(id)
            .orElseThrow { throw ArithmeticException("사용자 정보가 없습니다.") };
    }

}