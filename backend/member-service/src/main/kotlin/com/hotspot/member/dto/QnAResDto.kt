package com.hotspot.member.dto

class QnAResDto (

    val hotPlaceId: Long,

//    val hotPlaceName: String,

    val questionResDto: QuestionResDto,

    val answerResListDto: ArrayList<AnswerResDto>,
) {

    companion object {
        fun create(questionResDto: QuestionResDto): QnAResDto {
            return QnAResDto(hotPlaceId = questionResDto.hotPlaceId,
                questionResDto = questionResDto,
                answerResListDto = ArrayList<AnswerResDto>()
            )
        }
    }
}