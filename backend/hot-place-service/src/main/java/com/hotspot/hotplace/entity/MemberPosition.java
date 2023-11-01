package com.hotspot.hotplace.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@NoArgsConstructor
@RedisHash(value = "userPosition", timeToLive = 10)
public class MemberPosition {

    @Id
    private String id;

    @Indexed
    private Long hotPlaceId;

    @Indexed
    private Long memberId;

    private double x;

    private double y;

    @Builder
    public MemberPosition(Long hotPlaceId, Long memberId, double x, double y) {
        this.hotPlaceId = hotPlaceId;
        this.memberId = memberId;
        this.x = x;
        this.y = y;
    }

    public void updateMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
