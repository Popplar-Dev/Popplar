package com.hotspot.member.service

import com.hotspot.member.entity.Category
import com.hotspot.member.entity.MemberCategoryCount
import com.hotspot.member.entity.Stamp
import com.hotspot.member.repository.MemberCategoryCountRepository
import com.hotspot.member.repository.StampRepository
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

}