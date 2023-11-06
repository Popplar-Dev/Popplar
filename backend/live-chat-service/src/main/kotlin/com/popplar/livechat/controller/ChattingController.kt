package com.popplar.livechat.controller

import com.popplar.livechat.dto.ChattingReqDto
import com.popplar.livechat.dto.ChattingResDto
import com.popplar.livechat.service.ChattingService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.socket.messaging.SessionConnectEvent
import org.springframework.web.socket.messaging.SessionDisconnectEvent


@RestController
@RequestMapping("/live-chat")
class ChattingController (
//    private val logger: Logger = LoggerFactory.getLogger(ChattingController::class.java),
    private val chattingService: ChattingService,
){
    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
//    @EventListener
//    fun handleWebSocketConnectListener(event: SessionConnectEvent?) {
//        logger.info("Received a new web socket connection")
//    }

    // 사용자가 웹 소켓 연결을 끊으면 실행됨
//    @EventListener
//    fun handleWebSocketDisconnectListener(event: SessionDisconnectEvent) {
//        val headerAccessor = StompHeaderAccessor.wrap(event.message)
//        val sessionId = headerAccessor.sessionId
//        logger.info("sessionId Disconnected : $sessionId")
//    }

    @MessageMapping("/chat/{chattingRoomId}")
    @SendTo("/room/{chattingRoomId}")
    fun chat(chattingReqDto: ChattingReqDto, @DestinationVariable chattingRoomId: Long): ChattingResDto {
        return chattingService.insertChatting(chattingReqDto, chattingRoomId)
    }

    @GetMapping("/chatting-room/{chattingRoomId}")
    fun getChattingByChattingRoomId(@PathVariable chattingRoomId: Long): List<ChattingResDto> {
        return chattingService.getChattingByChattingRoomId(chattingRoomId)
    }

    //  채팅 어디까지 읽었는지
    //  또 뭐있지

}