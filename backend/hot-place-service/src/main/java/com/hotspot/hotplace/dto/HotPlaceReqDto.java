package com.hotspot.hotplace.dto;

import lombok.Data;

@Data
public class HotPlaceReqDto {

    private Long id;

    private String name;

    private String address;

    private double posX;

    private double posY;
}
