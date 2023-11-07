package com.popplar.gameservice.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberDto {
    private String name;
    private String profileImage;

    @Builder
    public MemberDto(String name, String profileImage) {
        this.name = name;
        this.profileImage = profileImage;
    }
}
