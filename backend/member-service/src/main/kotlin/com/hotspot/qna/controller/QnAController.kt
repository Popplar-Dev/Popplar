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

    /**
     * 특정 핫플레이스 질문 리스트 조회 API
     */
    @GetMapping("/hotplace/{hotPlaceId}")
    fun getHotPlaceQuestion(@PathVariable hotPlaceId: Long): ResponseEntity<ArrayList<QnAResDto>> {
        return ResponseEntity<ArrayList<QnAResDto>>(qnaService.getHotPlaceQuestion(hotPlaceId), HttpStatus.OK)
    }

    /**
     * 특정 질문 조회 API
     */
    @GetMapping("/question/{questionId}")
    fun getQuestion(@PathVariable questionId: Long): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.getQuestion(questionId), HttpStatus.OK)
    }

    /**
     * 질문 생성 API
     */
    @PostMapping("/question")
    fun createQuestion(
            @RequestHeader("Member-Id") myId: String,
            @RequestBody questionReqDto: QuestionReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.createQuestion(myId.toLong(), questionReqDto), HttpStatus.OK)
    }

    /**
     * 질문 수정 API
     * 답변이 달렸을 경우 수정 불가능
     */
    @PatchMapping("/question/{questionId}")
    fun updateQuestion(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.updateQuestion(myId.toLong(), questionId, qnaUpdateReqDto.content), HttpStatus.OK)
    }

    /**
     * 질문 삭제 API
     * 답변이 달렸을 경우 삭제 불가능
     */
    @DeleteMapping("/question/{questionId}")
    fun deleteQuestion(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long
    ) {
        qnaService.deleteQuestion(myId.toLong(), questionId)
    }

    /**
     * 답변 생성 API
     */
    @PostMapping("/answer/{questionId}")
    fun createAnswer(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @RequestBody answerReqDto: AnswerReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.createAnswer(myId.toLong(), questionId, answerReqDto), HttpStatus.OK)
    }

    /**
     * 답변 수정 API
     * 답변 채택 되었을 경우 수정 불가능
     */
    @PatchMapping("/answer/{questionId}/{answerId}")
    fun updateAnswer(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @PathVariable answerId: Long,
            @RequestBody qnaUpdateReqDto: QnAUpdateReqDto
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.updateAnswer(myId.toLong(), questionId, answerId, qnaUpdateReqDto.content), HttpStatus.OK)
    }

    /**
     * 답변 삭제 API
     * 답변 채택 되었을 경우 수정 불가능
     */
    @DeleteMapping("/answer/{questionId}/{answerId}")
    fun deleteAnswer(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @PathVariable answerId: Long,
    ) {
        qnaService.deleteAnswer(myId.toLong(), questionId, answerId)
    }

    /**
     * 답변 채택 API
     */
    @PatchMapping("/adopt/{questionId}/{answerId}")
    fun adoptAnswer(
            @RequestHeader("Member-Id") myId: String,
            @PathVariable questionId: Long,
            @PathVariable answerId: Long,
    ): ResponseEntity<QnAResDto> {
        return ResponseEntity<QnAResDto>(qnaService.adoptAnswer(myId.toLong(), questionId, answerId), HttpStatus.OK)
    }
}