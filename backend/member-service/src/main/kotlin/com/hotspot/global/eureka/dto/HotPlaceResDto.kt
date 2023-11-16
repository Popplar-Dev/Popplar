package com.hotspot.global.eureka.dto

class HotPlaceResDto(
    val id: Long,
    val placeName: String,
    val addressName: String,
    val roadAddressName: String,
    val phone: String,
    val x: Double,
    val y: Double,
    val category: String,
    val placeType: HotPlaceType,
    val likeCount: Int,
    val visitorCount: Int,
)