package com.hotspot.qna.controller

import com.hotspot.qna.dto.AnswerReqDto
import com.hotspot.qna.dto.QnAResDto
import com.hotspot.qna.dto.QnAUpdateReqDto
import com.hotspot.qna.dto.QuestionReqDto
import com.hotspot.qna.service.QnAService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/member/qna")
class QnAController(

        private val qnaService: QnAService,
) {

    @GetMapping("/hotplace/{hotPlaceId}")
    fun getHotPlaceQuestion(@PathVariable hotPlaceId: Long): ResponseEntity<ArrayList<QnAResDto>> {
        return ResponseEntity<ArrayList<QnAResDto>>(qnaService.getHotPlaceQuestion(hotPlaceId), HttpStatus.OK)
    }

    @GetMapping("/question/{questionId}")
    fun getQuestion(@PathVariable questionId: Long): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.getQuestion(questionId), HttpStatus.OK)
    }

    @PostMapping("/question")
    fun createQuestion(
            @RequestHeader("Member-Id") myId: String,
            @RequestBody questionReqDto: QuestionReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.createQuestion(myId.toLong(), questionReqDto), HttpStatus.OK)
    }

    @PatchMapping("/question/{questionId}")
    fun updateQuestion(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.updateQuestion(myId.toLong(), questionId, qnaUpdateReqDto.content), HttpStatus.OK)
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
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.createAnswer(myId.toLong(), questionId, answerReqDto), HttpStatus.OK)
    }

    @PatchMapping("/answer/{questionId}/{answerId}")
    fun updateAnswer(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @PathVariable answerId: Long,
            @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.updateAnswer(myId.toLong(), questionId, answerId, qnaUpdateReqDto.content), HttpStatus.OK)
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
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.adoptAnswer(myId.toLong(), questionId, answerId), HttpStatus.OK)
    }
}