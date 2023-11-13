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
import com.hotspot.global.eureka.dto.HotPlaceResDto
import com.hotspot.global.eureka.dto.VisitorReqDto
import com.hotspot.global.service.WebClientService
import com.hotspot.member.service.CryptService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient
import java.time.LocalDate
import java.time.LocalDateTime

@Service
@Transactional(readOnly = true)
class AchievementService(

    @Value("\${HOT_PLACE_URL}")
    private val hotPlaceURL: String,

    private val webClient: WebClient,
    private val stampRepository: StampRepository,
    private val memberCategoryCountRepository: MemberCategoryCountRepository,
    private val cryptService: CryptService,
) :WebClientService() {

    @Transactional
    fun createStamp(memberId: Long, stampReqDto: StampReqDto): StampResDto {
        val decryptedMemberId = cryptService.decrypt(memberId)

        val hotPlaceId = stampReqDto.hotPlaceId

        var stamp =
            stampRepository.findByMemberIdAndHotPlaceId(decryptedMemberId, stampReqDto.hotPlaceId)

        stamp?.let {
            if (it.updatedAt.toLocalDate() == LocalDate.now()) {
                throw RuntimeException("오늘 이미 스탬프를 획득했습니다.")
            }
        }
        stamp = stamp ?: stampRepository.save(Stamp.create(decryptedMemberId, hotPlaceId))

        stamp.increaseVisitCount()
        stamp = stampRepository.saveAndFlush(stamp)

        val hotPlaceResDto = webClient.get()
            .uri("$hotPlaceURL/$hotPlaceId")
            .header("Member-Id", decryptedMemberId.toString())
            .retrieve()
            .bodyToMono(HotPlaceResDto::class.java)
            .block()!!

        stamp.update(hotPlaceResDto)

//        val hotPlaceResDto = retryWithBackoff(webClient, HttpMethod.GET, "$hotPlaceURL/$hotPlaceId", VisitorReqDto.create(stamp), 5, HotPlaceResDto::class.java)

//        stamp.update(hotPlaceResDto!! as HotPlaceResDto)

        val memberCategoryCount =
            memberCategoryCountRepository.findByMemberIdAndCategory(stamp.memberId, stamp.category)
                ?: memberCategoryCountRepository.save(MemberCategoryCount.create(stamp))

        if (stamp.createdAt.toLocalDate() != LocalDate.now())
            memberCategoryCount.increaseVisitedSet()

        return StampResDto.create(stamp)
    }

    fun getMemberStampAndCategoryCountList(memberId: Long): AchievementResDto {
        val decryptedId = cryptService.decrypt(memberId)

        val achievementResDto = AchievementResDto.create()

        achievementResDto.memberCategoryResDtoList.addAll(
            Category.values()
                .filter { it != Category.NOT_YET }
                .map {
                    MemberCategoryCountResDto.create(
                        it,
                        memberCategoryCountRepository.findByMemberIdAndCategory(
                            decryptedId,
                            it
                        )?.visitedSet ?: 0
                    )
                })

        stampRepository.findAllByMemberId(decryptedId).forEach {
            achievementResDto.stampResDtoList.add(StampResDto.create(it))
        }

        return achievementResDto
    }

    fun getIsStampChecked(memberId: Long, hotPlaceId: Long): Boolean {
        val stamp = stampRepository.findByMemberIdAndHotPlaceId(memberId, hotPlaceId) ?: return false
        return stamp.updatedAt.toLocalDate() == LocalDate.now()

    }
}