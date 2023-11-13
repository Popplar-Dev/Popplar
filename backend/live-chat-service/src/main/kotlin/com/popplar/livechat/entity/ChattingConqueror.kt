package com.popplar.livechat.entity

import com.popplar.livechat.dto.ConquerorReqDto
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class ChattingConqueror(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var chattingRoomId: Long,

    var memberId: Long,
) : BaseEntity() {

    companion object {
        fun create(conquerorReqDto: ConquerorReqDto): ChattingConqueror {
            return ChattingConqueror(
                chattingRoomId = conquerorReqDto.chattingRoomId,
                memberId = conquerorReqDto.memberId
            )
        }
    }
}