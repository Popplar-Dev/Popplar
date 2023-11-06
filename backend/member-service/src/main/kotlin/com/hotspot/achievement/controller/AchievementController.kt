package com.hotspot.achievement.controller

import com.hotspot.achievement.dto.AchievementResDto
import com.hotspot.achievement.dto.StampReqDto
import com.hotspot.achievement.dto.StampResDto
import com.hotspot.achievement.service.AchievementService
import com.hotspot.auth.service.AuthService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member/achievement")
class AchievementController(

    private val achievementService: AchievementService,
    private val authService: AuthService,
) {

    @GetMapping("/{memberId}")
    fun getMemberCategoryCountList(@PathVariable memberId: Long): AchievementResDto {
        return achievementService.getMemberStampAndCategoryCountList(memberId)
    }

    @PostMapping("/{memberId}")
    fun createStamp(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable memberId: Long,
        @RequestBody stampReqDto: StampReqDto
    ): StampResDto {
        authService.checkAuth(memberId, myId)
        return achievementService.createStamp(memberId, stampReqDto)
    }
}