package com.popplar.gameservice.dto;


import com.popplar.gameservice.entity.GameType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class BoardDto {

    @NotNull
    private GameType type;

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private int points;

    @Builder
    public BoardDto(GameType type, Long memberId, Long hotPlaceId, int points) {
        this.type = type;
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.points = points;
    }
}
