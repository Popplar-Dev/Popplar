package com.popplar.chatservice.controller;


import com.popplar.chatservice.entity.ChatRoom;
import com.popplar.chatservice.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatServiceController {

    private final ChatService chatService;

    //내가 참여한 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room(@RequestHeader("Member-Id") String memberId) {
        return chatService.findAllRoom(Long.parseLong(memberId));
    }
    // 채팅방 생성
    @PostMapping("/room/{hotPlaceId}")
    @ResponseBody
    public ChatRoom createRoom(@PathVariable Long hotPlaceId) {
        return chatService.createRoom(hotPlaceId);
    }
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findById(roomId);
    }
}
