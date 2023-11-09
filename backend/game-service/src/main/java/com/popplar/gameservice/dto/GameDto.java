package com.popplar.gameservice.dto;

import com.popplar.gameservice.entity.GameType;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class GameDto {

    @NotNull
    private GameType type;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private Long memberId;

    @NotNull
    private double points;

    @NotNull
    private LocalDateTime createdDate;

    @Builder
    public GameDto(GameType type, Long hotPlaceId, Long memberId, double points,
        LocalDateTime createdDate) {
        this.type = type;
        this.hotPlaceId = hotPlaceId;
        this.memberId = memberId;
        this.points = points;
        this.createdDate = createdDate;
    }
}
