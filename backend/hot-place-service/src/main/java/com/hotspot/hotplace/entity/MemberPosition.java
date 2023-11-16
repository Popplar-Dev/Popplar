package com.hotspot.hotplace.entity;

import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Data
@NoArgsConstructor
@RedisHash(value = "userPosition", timeToLive = 3600)
public class MemberPosition implements Serializable {

    @Id
    private String id;

    @Indexed
    private Long memberId;

    @Indexed
    private Long hotPlaceId;

    private double x;

    private double y;

    @Builder
    public MemberPosition(Long hotPlaceId, Long memberId, double x, double y) {
        this.hotPlaceId = hotPlaceId;
        this.memberId = memberId;
        this.x = x;
        this.y = y;
    }

    public void memberUpdate(MemberPosition memberPosition) {
        this.hotPlaceId = memberPosition.getHotPlaceId();
        this.x = memberPosition.getX();
        this.y = memberPosition.getY();
    }
}
