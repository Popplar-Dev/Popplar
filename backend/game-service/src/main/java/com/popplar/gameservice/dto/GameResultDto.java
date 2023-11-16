package com.popplar.gameservice.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class GameResultDto {

    @NotNull
    private boolean isConqueror;

    @NotNull
    private double points;

    @NotNull
    private LocalDateTime createdTime;

    @NotNull
    private boolean qualified;

    @NotNull
    private List<RankDto> rankingList;

    @Builder
    public GameResultDto(boolean isConqueror, double points, LocalDateTime createdTime,
        boolean qualified, List<RankDto> rankingList) {
        this.isConqueror = isConqueror;
        this.points = points;
        this.createdTime = createdTime;
        this.qualified = qualified;
        this.rankingList = rankingList;
    }
}
