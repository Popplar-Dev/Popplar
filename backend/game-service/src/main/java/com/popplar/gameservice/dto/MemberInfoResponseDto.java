package com.popplar.gameservice.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberInfoResponseDto {
    List<MemberDto> memberDtoList;

    @Builder
    public MemberInfoResponseDto() {
        this.memberDtoList = new ArrayList<>();
    }
}
