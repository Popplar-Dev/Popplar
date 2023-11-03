package com.popplar.chatservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
@Table(name = "chat_rooms")
public class ChatRoom {

    @Id
    private String roomId;

    private Long hot_place_id;

    public static ChatRoom create(Long hotPlaceId) {
        ChatRoom room = new ChatRoom();
        room.roomId = UUID.randomUUID().toString();
        room.hot_place_id = hotPlaceId;
        return room;
    }
}