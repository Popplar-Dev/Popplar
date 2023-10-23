package com.hotspot.member.mapper

import com.hotspot.member.dto.MemberProfileResDto
import com.hotspot.member.entity.Member
import org.mapstruct.Mapper
import org.mapstruct.factory.Mappers

@Mapper
interface MemberMapper {

    fun entityToMemberProfileDto(member: Member): MemberProfileResDto

    companion object {
        val INSTANCE: MemberMapper = Mappers.getMapper(MemberMapper::class.java)
    }
}

