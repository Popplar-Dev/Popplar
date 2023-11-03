package com.popplar.livechat.entity

import com.popplar.livechat.dto.ChattingMemberReqDto
import jakarta.persistence.*

@Entity
@Table(name = "chatting_members")
class ChattingMember(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(unique = true)
    val memberId: Long,

    var memberName: String,

    var memberProfileImage: String,
) {
    fun update(chattingMemberReqDto: ChattingMemberReqDto) {
        this.memberName = chattingMemberReqDto.memberName
        this.memberProfileImage = chattingMemberReqDto.memberProfileImage
    }
}