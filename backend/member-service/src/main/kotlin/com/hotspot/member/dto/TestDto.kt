package com.hotspot.member.dto

import com.hotspot.member.entity.Member

class TestDto (
        val id: Long? = null,
        var name: String
) {
    companion object {
        fun create(temp: String): TestDto {
            return TestDto(
                    id = 1234,
                    name = temp
            )
        }
    }
}