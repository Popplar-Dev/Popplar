package com.popplar.chatservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "chat_rooms")
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long chatRoomId;

    private Long memberId;

    private String content;

    @Builder
    public ChatMessage(Long chatRoomId, Long memberId, String content) {
        this.chatRoomId = chatRoomId;
        this.memberId = memberId;
        this.content = content;
    }
}
