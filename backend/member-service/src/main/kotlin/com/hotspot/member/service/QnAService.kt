package com.hotspot.member.service

import com.hotspot.member.dto.QnAResDto
import com.hotspot.member.dto.QuestionReqDto
import com.hotspot.member.dto.QuestionResDto
import com.hotspot.member.entity.Member
import com.hotspot.member.entity.Question
import com.hotspot.member.repository.AnswerRepository
import com.hotspot.member.repository.MemberRepository
import com.hotspot.member.repository.QuestionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class QnAService(

    private val questionRepository: QuestionRepository,
    private val answerRepository: AnswerRepository,
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
) {

    fun getQuestion(questionId: Long): QnAResDto {
        val question = findQuestion(questionId)
        val questionResDto = questionToQuestionResDto(question)
        val qnaResDto = QnAResDto.create(questionResDto)

        return qnaResDto
    }

    @Transactional
    fun createQuestion(questionReqDto: QuestionReqDto): QuestionResDto {
        val question = questionRepository.save(Question.create(cryptService, questionReqDto))
        return questionToQuestionResDto(question)
    }


    fun findQuestion(questionId: Long): Question {
        return questionRepository.findByIdAndDeletedFalse(questionId)
            ?: throw RuntimeException("해당하는 질문이 없습니다.")
    }

    fun findMember(memberId: Long): Member {
        return memberRepository.findById(memberId)
            .orElseThrow { throw RuntimeException("찾는 회원이 없습니다.") }
    }

    fun questionToQuestionResDto(question: Question): QuestionResDto {
        val member = findMember(question.memberId)

        return QuestionResDto.create(
            question = question,
            memberName = member.name,
            memberProfileImage = member.profileImage
        )
    }
}