package com.hotspot.achievement.dto

class AchievementResDto (

    val stampResDtoList: ArrayList<StampResDto>,

    val memberCategoryResDtoList: ArrayList<MemberCategoryCountResDto>,
){

    companion object {
        fun create(): AchievementResDto {
            return AchievementResDto(
                stampResDtoList = ArrayList(),
                memberCategoryResDtoList = ArrayList()
            )
        }
    }
}