package com.hotspot.member.controller

import com.hotspot.member.dto.AnswerReqDto
import com.hotspot.member.dto.QnAResDto
import com.hotspot.member.dto.QuestionReqDto
import com.hotspot.member.dto.QuestionResDto
import com.hotspot.member.service.CryptService
import com.hotspot.member.service.MemberService
import com.hotspot.member.service.QnAService
import org.springframework.web.bind.annotation.GetMapping
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

}