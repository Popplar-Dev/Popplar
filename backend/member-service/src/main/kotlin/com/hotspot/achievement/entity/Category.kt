package com.hotspot.achievement.entity

enum class Category {
    RESTAURANT,
    CAFE,
    SCHOOL,
    CULTURAL,
    ATTRACTION,
    ETC;

    fun toKor(): String {
        return when (this) {
            RESTAURANT -> "음식점"
            CAFE -> "카페"
            SCHOOL -> "학교"
            CULTURAL -> "문화시설"
            ATTRACTION -> "관광명소"
            ETC -> "기타"
        }
    }

    companion object {
        fun parse(text: String): Category = when (text) {
            "음식점" -> RESTAURANT
            "카페" -> CAFE
            "학교" -> SCHOOL
            "문화시설" -> CULTURAL
            "관광명소" -> ATTRACTION
            else -> ETC
        }
    }
}
