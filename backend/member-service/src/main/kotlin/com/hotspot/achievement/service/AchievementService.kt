package com.hotspot.achievement.service

import com.hotspot.achievement.dto.AchievementResDto
import com.hotspot.achievement.dto.MemberCategoryCountResDto
import com.hotspot.achievement.dto.StampReqDto
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
    fun createStamp(memberId: Long, stampReqDto: StampReqDto): AchievementResDto {
        val decryptedMemberId = cryptService.decrypt(memberId)
        var stamp =
            stampRepository.findByMemberIdAndHotPlaceId(decryptedMemberId, stampReqDto.hotPlaceId)

        stamp?.let {
            if (it.updatedAt.toLocalDate() == LocalDate.now()) {
                throw RuntimeException("오늘 이미 스탬프를 획득했습니다.")
            }
        }
        stamp = stamp ?: stampRepository.save(Stamp.create(decryptedMemberId, stampReqDto))

        val memberCategoryCount =
            memberCategoryCountRepository.findByMemberIdAndCategory(stamp.memberId, stamp.category)
                ?: memberCategoryCountRepository.save(MemberCategoryCount.create(stamp))
        memberCategoryCount.increaseVisitedSet()

        stamp.increaseVisitCount()

        // TODO
        //  @Transactional 사용하지 않는 로직이라 분리 예정
        return getMemberStampAndCategoryCountList(memberId)
    }

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