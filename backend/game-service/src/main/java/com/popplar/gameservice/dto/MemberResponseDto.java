package com.popplar.gameservice.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class MemberResponseDto {

    List<MemberInfoDto> memberInfoDtoList = new ArrayList<>();

    @Builder
    public MemberResponseDto(List<MemberInfoDto> memberInfoDtoList) {
        this.memberInfoDtoList = memberInfoDtoList;
    }
}
