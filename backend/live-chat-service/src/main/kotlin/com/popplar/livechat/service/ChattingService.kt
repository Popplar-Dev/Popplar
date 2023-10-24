package com.popplar.livechat.service

import com.popplar.livechat.dto.ChattingReqDto
import com.popplar.livechat.dto.ChattingResDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ChattingService()