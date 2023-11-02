package com.hotspot.hotplace.dto;
import lombok.Data;

@Data
public class HotPlaceReqDto {

    private Long id;

    private String placeName;

    private String addressName;

    private String roadAddressName;

    private String phone;

    private double x;

    private double y;

    private String category;
}
