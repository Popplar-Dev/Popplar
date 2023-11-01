package com.hotspot.qna.service

import com.hotspot.qna.entity.Answer
import com.hotspot.member.entity.Member
import com.hotspot.qna.entity.Question
import com.hotspot.qna.repository.AnswerRepository
import com.hotspot.member.repository.MemberRepository
import com.hotspot.qna.repository.QuestionRepository
import com.hotspot.member.service.CryptService
import com.hotspot.qna.dto.*
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
    fun createQuestion(questionReqDto: QuestionReqDto): QnAResDto {
        val question =
            questionRepository.save(Question.create(cryptService, questionReqDto))
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

    @Transactional
    fun adoptAnswer(questionId: Long, answerId: Long): QnAResDto {
        val question = findQuestionById(questionId)

        if (question.adoptedAnswer != null) {
            throw RuntimeException("이미 채택 하였습니다.")
        }

        val answer = findAnswerById(answerId)

        question.adopt(answer)
        return questionToQnAResDto(question)
    }

    @Transactional
    fun updateQuestion(questionId: Long, content: String): QnAResDto {
        val question = findQuestionById(questionId)

        if (question.answerList.isNotEmpty()) {
            throw RuntimeException("답변이 있는 경우 삭제할 수 없습니다.")
        }

        question.update(content)

        return questionToQnAResDto(question)
    }

    @Transactional
    fun deleteQuestion(questionId: Long) {
        val question = findQuestionById(questionId)

        if (question.answerList.isNotEmpty()) {
            throw RuntimeException("답변이 있는 경우 삭제할 수 없습니다.")
        }

        question.delete()
    }

    @Transactional
    fun updateAnswer(questionId: Long, answerId: Long, content: String): QnAResDto {
        val question = findQuestionById(questionId)
        val answer = findAnswerById(answerId)

        if (question.adoptedAnswer == answer) {
            throw RuntimeException("답변이 채택 된 경우 수정할 수 없습니다.")
        }

        answer.update(content)

        return questionToQnAResDto(question)
    }

    @Transactional
    fun deleteAnswer(questionId: Long, answerId: Long) {
        val question = findQuestionById(questionId)
        val answer = findAnswerById(answerId)

        if (question.adoptedAnswer == answer) {
            throw RuntimeException("답변이 채택 된 경우 삭제할 수 없습니다.")
        }

        answer.delete()
    }


    fun questionToQnAResDto(question: Question): QnAResDto {
        val questionResDto = questionToQuestionResDto(question)
        val qnaResDto = QnAResDto.create(questionResDto)

        question.answerList
            .filter { !it.deleted }
            .forEach {
                val answerMember = findMemberById(it.memberId)
                qnaResDto.answerResDtoList.add(
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

    fun findAnswerById(answerId: Long): Answer {
        return answerRepository.findByIdAndDeletedFalse(answerId)
            ?: throw RuntimeException("해당하는 답변이 없습니다.")
    }

    fun findMemberById(memberId: Long): Member {
        return memberRepository.findById(memberId)
            .orElseThrow { throw RuntimeException("찾는 회원이 없습니다.") }
    }
}