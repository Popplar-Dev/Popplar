package com.popplar.gameservice.dto;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class GameInfoResDto {

    private MemberInfoDto conquerorInfo;
    private double conquerorPoints;
    private double maxReflexesPoints;
    private double maxFightingPoints;
    private double myMaxReflexesPoints;
    private double myMaxFightingPoints;
    private boolean hasConqueror;

    @Builder
    public GameInfoResDto(MemberInfoDto conquerorInfo, double conquerorPoints,
        double maxReflexesPoints,
        double maxFightingPoints, double myMaxReflexesPoints, double myMaxFightingPoints,
        boolean hasConqueror) {
        this.conquerorInfo = conquerorInfo;
        this.conquerorPoints = conquerorPoints;
        this.maxReflexesPoints = maxReflexesPoints;
        this.maxFightingPoints = maxFightingPoints;
        this.myMaxReflexesPoints = myMaxReflexesPoints;
        this.myMaxFightingPoints = myMaxFightingPoints;
        this.hasConqueror = hasConqueror;
    }
}
