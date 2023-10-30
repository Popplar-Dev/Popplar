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

    @GetMapping("/{questionId}")
    fun getQuestion(@PathVariable questionId: Long): QnAResDto {
        return qnaService.getQuestion(questionId)
    }

    @PostMapping
    fun createQuestion(@RequestBody questionReqDto: QuestionReqDto): QnAResDto {
        return qnaService.createQuestion(questionReqDto)
    }

    @PostMapping("/{questionId}")
    fun createAnswer(
        @PathVariable questionId: Long,
        @RequestBody answerReqDto: AnswerReqDto
    ): QnAResDto {
        return qnaService.createAnswer(questionId, answerReqDto)
    }

}