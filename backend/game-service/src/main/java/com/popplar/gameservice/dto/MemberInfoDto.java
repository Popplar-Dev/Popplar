package com.popplar.gameservice.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class MemberInfoDto {

    @JsonProperty
    private String name;
    @JsonProperty
    private String profileImage;

    @Builder
    public MemberInfoDto(String name, String profileImage) {
        this.name = name;
        this.profileImage = profileImage;
    }
}
