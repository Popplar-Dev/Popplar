package com.popplar.gameservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
public class ConquerorInfoDto {

    @NotNull
    private Long id;

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private int points;

    @Builder
    public ConquerorInfoDto(Long id, Long memberId, Long hotPlaceId, int points) {
        this.id = id;
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.points = points;
    }
}
