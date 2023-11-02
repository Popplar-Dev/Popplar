package com.hotspot.qna.controller

import com.hotspot.qna.dto.AnswerReqDto
import com.hotspot.qna.dto.QnAResDto
import com.hotspot.qna.dto.QnAUpdateReqDto
import com.hotspot.qna.dto.QuestionReqDto
import com.hotspot.qna.service.QnAService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
        @RequestBody questionReqDto: QuestionReqDto
    ): QnAResDto {
        return qnaService.createQuestion(questionReqDto)
    }

    @PatchMapping("/question/{questionId}")
    fun updateQuestion(
        @PathVariable questionId: Long,
        @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): QnAResDto {
        return qnaService.updateQuestion(questionId, qnaUpdateReqDto.content)
    }

    @DeleteMapping("/question/{questionId}")
    fun deleteQuestion(@PathVariable questionId: Long) {
        qnaService.deleteQuestion(questionId)
    }

    @PostMapping("/answer/{questionId}")
    fun createAnswer(
        @PathVariable questionId: Long,
        @RequestBody answerReqDto: AnswerReqDto
    ): QnAResDto {
        return qnaService.createAnswer(questionId, answerReqDto)
    }

    @PatchMapping("/answer/{questionId}/{answerId}")
    fun updateAnswer(
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
        @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): QnAResDto {
        return qnaService.updateAnswer(questionId, answerId, qnaUpdateReqDto.content)
    }

    @DeleteMapping("/answer/{questionId}/{answerId}")
    fun deleteAnswer(
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
    ) {
        qnaService.deleteAnswer(questionId, answerId)
    }

    @PatchMapping("/adopt/{questionId}/{answerId}")
    fun adoptAnswer(
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
    ): QnAResDto {
        return qnaService.adoptAnswer(questionId, answerId)
    }
}