package com.hotspot.qna.dto

class QnAResDto (

    val hotPlaceId: Long,

//    val hotPlaceName: String,

    val questionResDto: QuestionResDto,

    val answerResDtoList: ArrayList<AnswerResDto>,
) {

    companion object {
        fun create(questionResDto: QuestionResDto): QnAResDto {
            return QnAResDto(hotPlaceId = questionResDto.hotPlaceId,
                questionResDto = questionResDto,
                answerResDtoList = ArrayList<AnswerResDto>()
            )
        }
    }
}