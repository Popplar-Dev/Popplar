package com.hotspot.hotplace.dto;

import com.hotspot.hotplace.entity.HotPlaceType;
import lombok.Data;

@Data
public class HotPlaceResDto {

    private Long id;

    private String placeName;

    private String addressName;

    private String roadAddressName;

    private String phone;

    private double x;

    private double y;

    private String category;

    private HotPlaceType placeType;

    private int likeCount;

    private int visitorCount;

    private int rank;
}
