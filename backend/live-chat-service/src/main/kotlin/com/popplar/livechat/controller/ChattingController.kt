package com.popplar.livechat.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.stereotype.Controller
import org.springframework.web.socket.messaging.SessionConnectEvent
import org.springframework.web.socket.messaging.SessionDisconnectEvent


@Controller
class ChattingController (
    private val logger: Logger = LoggerFactory.getLogger(ChattingController::class.java)
){
    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
    @EventListener
    fun handleWebSocketConnectListener(event: SessionConnectEvent?) {
        logger.info("Received a new web socket connection")
    }

    // 사용자가 웹 소켓 연결을 끊으면 실행됨
    @EventListener
    fun handleWebSocketDisconnectListener(event: SessionDisconnectEvent) {
        val headerAccesor = StompHeaderAccessor.wrap(event.message)
        val sessionId = headerAccesor.sessionId
        logger.info("sessionId Disconnected : $sessionId")
    }
    @MessageMapping
    @SendTo
    fun chat() {
        TODO("Not Impl Yet")
    }

}