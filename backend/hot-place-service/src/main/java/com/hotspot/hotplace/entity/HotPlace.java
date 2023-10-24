package com.hotspot.hotplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "hot_places")
public class HotPlace {

    @Id
    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private double posX;

    @NotNull
    private double posY;

    @NotNull
    private int level;

    @NotNull
    private int likeCount;

    @Builder
    public HotPlace(Long id, String name, String address, double posX, double posY, int level) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.posX = posX;
        this.posY = posY;
        this.level = level;
        this.likeCount = 0;
    }

    public void increaseLikeCount() {
        this.likeCount++;
    }

    public void decreaseLikeCount() {
        this.likeCount--;
    }
}
