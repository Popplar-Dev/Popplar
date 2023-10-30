package com.hotspot.member.controller

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
class QnAController (

    private val memberService: MemberService,
    private val qnaService: QnAService,
    private val cryptService: CryptService,
){

    @GetMapping("/{questionId}")
    fun getQuestion(@PathVariable questionId: Long): QnAResDto {
        return qnaService.getQuestion(questionId)
    }

    @PostMapping
    fun createQuestion(@RequestBody questionReqDto: QuestionReqDto): QuestionResDto {
        return qnaService.createQuestion(questionReqDto)
    }

}