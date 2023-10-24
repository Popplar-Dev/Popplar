package com.popplar.chatservice.controller;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@NoArgsConstructor
@RequestMapping("/chat")
public class ChatServiceController {

    @Value("${server.port}")
    private String port;

    @GetMapping("/info")
    public String info(@RequestHeader("Member-Id") Long memberId) {
        return "Chat Service의 기본 동작 Port : " + port + " Id : " + memberId;
    }
}
