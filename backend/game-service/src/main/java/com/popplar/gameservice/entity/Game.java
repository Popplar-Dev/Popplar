package com.popplar.gameservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "games")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Game extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private GameType type;

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private double points;

    @Builder
    public Game(GameType type, Long memberId, Long hotPlaceId, double points) {
        this.type = type;
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.points = points;
    }
}
