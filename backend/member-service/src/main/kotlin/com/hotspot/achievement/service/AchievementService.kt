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
import com.hotspot.member.service.CryptService
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.reactive.function.client.WebClient
import java.time.LocalDate

@Service
@Transactional(readOnly = true)
class AchievementService(

    @Value("\${GATEWAY_URL}")
    private val gatewayURL: String,
    private val webClient: WebClient,
    private val stampRepository: StampRepository,
    private val memberCategoryCountRepository: MemberCategoryCountRepository,
    private val cryptService: CryptService,
) {

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


        val hotPlaceResDto = webClient.post()
            .uri("$gatewayURL/hot-place/$hotPlaceId")
            .bodyValue(VisitorReqDto.create(stamp))
            .retrieve()
            .bodyToMono(HotPlaceResDto::class.java)
            .block() ?: throw RuntimeException("해당하는 핫플레이스가 없습니다")

        stamp.update(hotPlaceResDto)

        val memberCategoryCount =
            memberCategoryCountRepository.findByMemberIdAndCategory(stamp.memberId, stamp.category)
                ?: memberCategoryCountRepository.save(MemberCategoryCount.create(stamp))
        memberCategoryCount.increaseVisitedSet()

        stamp.increaseVisitCount()

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

        return achievementResDto
    }
}