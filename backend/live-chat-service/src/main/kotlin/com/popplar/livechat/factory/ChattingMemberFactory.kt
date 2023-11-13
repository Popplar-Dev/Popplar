package com.popplar.livechat.factory

import com.popplar.livechat.entity.ChattingMember
import com.popplar.livechat.repository.ChattingMemberRepository
import org.springframework.stereotype.Component

@Component
class ChattingMemberFactory (

    private val chattingMemberRepository: ChattingMemberRepository,
){

    private val chattingMemberMap: MutableMap<Long, ChattingMember> = mutableMapOf()

    init {
        chattingMemberRepository.findAll().map {
            chattingMemberMap[it.memberId] = it
        }
    }

    fun getChattingMember(memberId: Long): ChattingMember {
        return chattingMemberMap[memberId]?: throw RuntimeException("해당하는 멤버가 없습니다")
    }

    fun updateChattingMember(chattingMember: ChattingMember) {
        chattingMemberMap[chattingMember.memberId] = chattingMember
    }
}