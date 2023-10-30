package com.hotspot.hotplace.dto;

import com.hotspot.hotplace.entity.HotPlaceType;
import lombok.Data;

@Data
public class HotPlaceResDto {

    private Long id;

    private String name;

    private String address;

    private double posX;

    private double posY;

    private HotPlaceType category;

    private int likeCount;

    private int visitorCount;
}
