package com.hotspot.member.service

import com.hotspot.member.dto.*
import com.hotspot.member.entity.Answer
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
        val question = findQuestionById(questionId)
        val questionResDto = questionToQuestionResDto(question)
        val qnaResDto = QnAResDto.create(questionResDto)

        return qnaResDto
    }

    @Transactional
    fun createQuestion(questionReqDto: QuestionReqDto): QuestionResDto {
        val question = questionRepository.save(Question.create(cryptService, questionReqDto))
        return questionToQuestionResDto(question)
    }

    @Transactional
    fun createAnswer(questionId: Long, answerReqDto: AnswerReqDto): QnAResDto {
        val question = findQuestionById(questionId)
        val answer = answerRepository.save(
            Answer.create(
                cryptService,
                question.hotPlaceId,
                questionId,
                answerReqDto
            )
        )
        question.insertAnswer(answer)
        val member = findMemberById(answer.memberId)

        val questionResDto = questionToQuestionResDto(question)
        val answerResDto = AnswerResDto.create(
            cryptService = cryptService,
            answer = answer,
            memberName = member.name,
            memberProfileImage = member.profileImage
        )

        val qnaResDto = QnAResDto.create(questionResDto)

        question.answerList.forEach {
            val answerMember = findMemberById(it.memberId)
            qnaResDto.answerResListDto.add(
                AnswerResDto.create(
                    cryptService = cryptService,
                    answer = it,
                    memberName = answerMember.name,
                    memberProfileImage = answerMember.profileImage
                )
            )
        }

        return qnaResDto
    }

    fun questionToQuestionResDto(question: Question): QuestionResDto {
        val member = findMemberById(question.memberId)

        return QuestionResDto.create(
            cryptService = cryptService,
            question = question,
            memberName = member.name,
            memberProfileImage = member.profileImage
        )
    }

    fun findQuestionById(questionId: Long): Question {
        return questionRepository.findByIdAndDeletedFalse(questionId)
            ?: throw RuntimeException("해당하는 질문이 없습니다.")
    }

    fun findMemberById(memberId: Long): Member {
        return memberRepository.findById(memberId)
            .orElseThrow { throw RuntimeException("찾는 회원이 없습니다.") }
    }
}