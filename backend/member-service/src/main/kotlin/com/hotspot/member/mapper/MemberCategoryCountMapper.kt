package com.hotspot.member.mapper

import com.hotspot.member.dto.MemberCategoryCountResDto
import com.hotspot.member.entity.MemberCategoryCount
import org.mapstruct.Mapper
import org.mapstruct.factory.Mappers

@Mapper
interface MemberCategoryCountMapper {

    fun entityToMemberCategoryCountResDto(memberCategoryCount: MemberCategoryCount): MemberCategoryCountResDto

    companion object {
        val INSTANCE: MemberCategoryCountMapper = Mappers.getMapper(MemberCategoryCountMapper::class.java)
    }
}