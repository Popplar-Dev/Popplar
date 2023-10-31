package com.popplar.gameservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
public class GameResultDto {

    //정복자가 되었는지 안되었는지
    @NotNull
    private boolean isConqueror;
    //본인의 최종 점수
    @NotNull
    private int points;

    @Builder
    public GameResultDto(boolean isConqueror, int points) {
        this.isConqueror = isConqueror;
        this.points = points;
    }
}
