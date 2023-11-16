package com.popplar.livechat.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer

@Configuration
@EnableWebSocketMessageBroker //웹 소켓 메시지를 다룰 수 있게 허용
//웹 소켓 메시지를 다룰 수 있게 허용
class WebSocketConfig : WebSocketMessageBrokerConfigurer {

    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        //발행자가 "/room"의 경로로 메시지를 주면 구독자들에게 전달
        config.enableSimpleBroker("/room")
        // 발행자가 "/live-chat"의 경로로 메시지를 주면 가공을 해서 구독자들에게 전달
        config.setApplicationDestinationPrefixes("/live-chat")
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        // 커넥션을 맺는 경로 설정. 만약 WebSocket을 사용할 수 없는 브라우저라면 다른 방식을 사용하도록 설정
        registry.addEndpoint("/gs-guide-websocket")
            .withSockJS()
    }
}