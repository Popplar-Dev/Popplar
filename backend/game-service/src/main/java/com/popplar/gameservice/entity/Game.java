package com.popplar.gameservice.entity;

import jakarta.persistence.Entity;
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
    private GameType type;

    @NotNull
    private Long memberId;

    @NotNull
    private Long hotPlaceId;

    @NotNull
    private int point;

    @Builder
    public Game(GameType type, Long memberId, Long hotPlaceId, int point) {
        this.type = type;
        this.memberId = memberId;
        this.hotPlaceId = hotPlaceId;
        this.point = point;
    }
}
