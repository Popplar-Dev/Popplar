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
import kotlin.streams.toList

@Service
@Transactional(readOnly = true)
class QnAService(

    private val questionRepository: QuestionRepository,
    private val answerRepository: AnswerRepository,
    private val memberRepository: MemberRepository,
    private val cryptService: CryptService,
) {

    fun getHotPlaceQuestion(hotPlaceId: Long): ArrayList<QnAResDto> {
        return questionRepository.findAllByHotPlaceIdAndDeletedFalse(hotPlaceId)
            .asSequence()
            .map { questionToQnAResDto(it) }
            .toCollection(ArrayList())
    }

    fun getQuestion(questionId: Long): QnAResDto {
        val question = findQuestionById(questionId)

        return questionToQnAResDto(question)
    }

    @Transactional
    fun createQuestion(hotPlaceId: Long, questionReqDto: QuestionReqDto): QnAResDto {
        val question = questionRepository.save(Question.create(cryptService, hotPlaceId, questionReqDto))
        return questionToQnAResDto(question)
    }

    @Transactional
    fun createAnswer(questionId: Long, answerReqDto: AnswerReqDto): QnAResDto {
        val question = findQuestionById(questionId)
        answerRepository.save(
            Answer.create(
                cryptService,
                question.hotPlaceId,
                questionId,
                answerReqDto
            )
        )

        return questionToQnAResDto(question)
    }

    fun questionToQnAResDto(question: Question): QnAResDto {
        val questionResDto = questionToQuestionResDto(question)
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