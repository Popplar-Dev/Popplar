package com.popplar.gameservice.dto;

import com.popplar.gameservice.entity.GameType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class GameDto {

    @NotNull
    private GameType type;

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private int point;

    @Builder
    public GameDto(GameType type, Long memberId, Long hotPlaceId, int point) {
        this.type = type;
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.point = point;
    }
}
