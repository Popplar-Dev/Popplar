package com.hotspot.achievement.service

import com.hotspot.achievement.dto.AchievementResDto
import com.hotspot.achievement.dto.MemberCategoryCountResDto
import com.hotspot.achievement.dto.StampResDto
import com.hotspot.achievement.entity.Category
import com.hotspot.achievement.entity.MemberCategoryCount
import com.hotspot.achievement.entity.Stamp
import com.hotspot.achievement.repository.MemberCategoryCountRepository
import com.hotspot.achievement.repository.StampRepository
import com.hotspot.member.service.CryptService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
@Transactional(readOnly = true)
class AchievementService(
    private val stampRepository: StampRepository,
    private val memberCategoryCountRepository: MemberCategoryCountRepository,
    private val cryptService: CryptService,
) {

    @Transactional
    fun updateStamp(memberId: Long, hotPlaceId: Long, category: Category) {
        val decryptedMemberId = cryptService.decrypt(memberId)
        val decryptedHotPlaceId = cryptService.decrypt(hotPlaceId)
        var stamp =
            stampRepository.findByMemberIdAndHotPlaceId(decryptedMemberId, decryptedHotPlaceId)
        if (stamp == null) {
            stamp = Stamp.create(memberId, hotPlaceId, category)
            increaseCategoryCount(stamp)
//            checkAchievement()
        }
        stamp.increaseVisitCount()
    }

    @Transactional
    fun increaseCategoryCount(stamp: Stamp): MemberCategoryCount {
        if (stamp.updatedAt.toLocalDate() < LocalDate.now()) {
            throw RuntimeException("오늘 이미 스탬프를 찍었습니다.")
        }
        val memberCategoryCount =
            memberCategoryCountRepository.findByMemberIdAndCategory(stamp.memberId, stamp.category)
                ?: MemberCategoryCount.create(stamp)
        memberCategoryCount.increaseVisitedSet()
        return memberCategoryCount
    }

//    fun checkAchievement() {
//        TODO()
//    }

    fun getMemberStampAndCategoryCountList(memberId: Long): AchievementResDto {
        val decryptedId = cryptService.decrypt(memberId)

        val achievementResDto = AchievementResDto.create()

        stampRepository.findAllByMemberId(decryptedId)
            .map {
                achievementResDto.stampResDtoList.add(StampResDto.create(it))
            }

        memberCategoryCountRepository.findByMemberId(decryptedId)
            .map {
                achievementResDto.memberCategoryResDtoList.add(
                    MemberCategoryCountResDto.create(it)
                )
            }

        return achievementResDto
    }

}