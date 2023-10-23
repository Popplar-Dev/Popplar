package com.example.chatservice.controller;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@NoArgsConstructor
public class ChatServiceController {
    @Value("${server.port}")
    private String port;

    @GetMapping("/info")
    public String info() {
        return "Chat Service의 기본 동작 Port : " + port;
    }
}
