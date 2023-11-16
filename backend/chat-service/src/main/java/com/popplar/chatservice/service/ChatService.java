package com.popplar.chatservice.service;


import com.popplar.chatservice.entity.ChatRoom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

    private Map<String, ChatRoom> chatRooms;


    //채팅방 불러오기
    public List<ChatRoom> findAllRoom(long hotPlaceId) {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
        Collections.reverse(result);

        return result;
    }

    //채팅방 하나 불러오기
    public ChatRoom findById(String roomId) {
        return chatRooms.get(roomId);
    }

    //채팅방 생성
    public ChatRoom createRoom(Long hotPlaceId) {
        ChatRoom chatRoom = ChatRoom.create(hotPlaceId);
        chatRooms.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
}