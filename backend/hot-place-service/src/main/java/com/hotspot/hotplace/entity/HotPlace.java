package com.hotspot.hotplace.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    private String placeName;

    @NotNull
    private String addressName;

    @NotNull
    private String roadAddressName;

    @NotNull
    private String phone;

    @NotNull
    private double x;

    @NotNull
    private double y;

    @NotNull
    @Enumerated(EnumType.STRING)
    private HotPlaceType placeType;

    @NotNull
    private String category;

    @NotNull
    private int likeCount;

    @Builder
    public HotPlace(Long id, String placeName, String addressName, String phone,
        String roadAddressName,
        double x, double y, String category) {
        this.id = id;
        this.placeName = placeName;
        this.addressName = addressName;
        this.phone = phone;
        this.roadAddressName = roadAddressName;
        this.x = x;
        this.y = y;
        this.category = category;
        this.placeType = HotPlaceType.FLAG;
        this.likeCount = 0;
    }

    public void increaseLikeCount() {
        this.likeCount++;
    }

    public void decreaseLikeCount() {
        this.likeCount--;
    }

    public void updatePlaceType(HotPlaceType hotPlaceType) {
        this.placeType = hotPlaceType;
    }
}
