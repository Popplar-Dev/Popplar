package com.hotspot.achievement.controller

import com.hotspot.achievement.dto.AchievementResDto
import com.hotspot.achievement.dto.StampReqDto
import com.hotspot.achievement.dto.StampResDto
import com.hotspot.achievement.service.AchievementService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/achievement")
class AchievementController(

    private val achievementService: AchievementService,
) {

    @GetMapping("/{memberId}")
    fun getMemberCategoryCountList(@PathVariable memberId: Long): AchievementResDto {
        return achievementService.getMemberStampAndCategoryCountList(memberId)
    }

    @PostMapping("/{memberId}")
    fun createStamp(
        @PathVariable memberId: Long,
        @RequestBody stampReqDto: StampReqDto
    ): StampResDto {
        return achievementService.createStamp(memberId, stampReqDto)
    }
}