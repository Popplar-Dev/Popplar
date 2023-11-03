package com.hotspot.qna.controller

import com.hotspot.qna.dto.AnswerReqDto
import com.hotspot.qna.dto.QnAResDto
import com.hotspot.qna.dto.QnAUpdateReqDto
import com.hotspot.qna.dto.QuestionReqDto
import com.hotspot.qna.service.QnAService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member/qna")
class QnAController(

    private val qnaService: QnAService,
) {

    @GetMapping("/hotplace/{hotPlaceId}")
    fun getHotPlaceQuestion(@PathVariable hotPlaceId: Long): ArrayList<QnAResDto> {
        return qnaService.getHotPlaceQuestion(hotPlaceId)
    }

    @GetMapping("/question/{questionId}")
    fun getQuestion(@PathVariable questionId: Long): QnAResDto {
        return qnaService.getQuestion(questionId)
    }

    @PostMapping("/question")
    fun createQuestion(
        @RequestHeader("Member-Id") myId: String,
        @RequestBody questionReqDto: QuestionReqDto
    ): QnAResDto {
        return qnaService.createQuestion(myId.toLong(), questionReqDto)
    }

    @PatchMapping("/question/{questionId}")
    fun updateQuestion(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long,
        @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): QnAResDto {
        return qnaService.updateQuestion(myId.toLong(), questionId, qnaUpdateReqDto.content)
    }

    @DeleteMapping("/question/{questionId}")
    fun deleteQuestion(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long
    ) {
        qnaService.deleteQuestion(myId.toLong(), questionId)
    }

    @PostMapping("/answer/{questionId}")
    fun createAnswer(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long,
        @RequestBody answerReqDto: AnswerReqDto
    ): QnAResDto {
        return qnaService.createAnswer(myId.toLong(), questionId, answerReqDto)
    }

    @PatchMapping("/answer/{questionId}/{answerId}")
    fun updateAnswer(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
        @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): QnAResDto {
        return qnaService.updateAnswer(myId.toLong(), questionId, answerId, qnaUpdateReqDto.content)
    }

    @DeleteMapping("/answer/{questionId}/{answerId}")
    fun deleteAnswer(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
    ) {
        qnaService.deleteAnswer(myId.toLong(), questionId, answerId)
    }

    @PatchMapping("/adopt/{questionId}/{answerId}")
    fun adoptAnswer(
        @RequestHeader("Member-Id") myId: String,
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
    ): QnAResDto {
        return qnaService.adoptAnswer(myId.toLong(), questionId, answerId)
    }
}