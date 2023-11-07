package com.popplar.gameservice.dto;


import com.popplar.gameservice.entity.GameType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RankDto {

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private GameType type;

    @NotNull
    private double points;

    @NotNull
    private String memberName;

    @NotNull
    private String memberProfileImage;

    public void setRankDtoMember(MemberInfoDto memberInfoDto) {
        this.memberName = memberInfoDto.getName();
        this.memberProfileImage = memberInfoDto.getProfileImage();
    }

    @Builder
    public RankDto(Long memberId, Long hotPlaceId, GameType type, double points) {
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.type = type;
        this.points = points;
    }
}
