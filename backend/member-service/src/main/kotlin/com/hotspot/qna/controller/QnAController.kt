package com.hotspot.qna.controller

import com.hotspot.qna.dto.AnswerReqDto
import com.hotspot.qna.dto.QnAResDto
import com.hotspot.qna.dto.QuestionReqDto
import com.hotspot.qna.service.QnAService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/qna")
class QnAController(

    private val qnaService: QnAService,
) {

    @GetMapping("/{hotPlaceId}")
    fun getHotPlaceQuestion(@PathVariable hotPlaceId: Long): ArrayList<QnAResDto> {
        return qnaService.getHotPlaceQuestion(hotPlaceId)
    }

    @GetMapping("/{hotPlaceId}/{questionId}")
    fun getQuestion(@PathVariable hotPlaceId: Long, @PathVariable questionId: Long): QnAResDto {
        return qnaService.getQuestion(questionId)
    }

    @PostMapping("/{hotPlaceId}")
    fun createQuestion(
        @PathVariable hotPlaceId: Long,
        @RequestBody questionReqDto: QuestionReqDto
    ): QnAResDto {
        return qnaService.createQuestion(hotPlaceId, questionReqDto)
    }

    @PostMapping("/{hotPlaceId}/{questionId}")
    fun createAnswer(
        @PathVariable hotPlaceId: Long,
        @PathVariable questionId: Long,
        @RequestBody answerReqDto: AnswerReqDto
    ): QnAResDto {
        return qnaService.createAnswer(questionId, answerReqDto)
    }

    @PatchMapping("/adopt/{questionId}/{answerId}")
    fun adoptAnswer(
        @PathVariable questionId: Long,
        @PathVariable answerId: Long,
    ): QnAResDto {
        return qnaService.adoptAnswer(questionId, answerId)
    }
}