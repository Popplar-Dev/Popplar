package com.hotspot.visitor.dto;

import com.hotspot.hotplace.entity.HotPlace;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class VisitorResDto {

    Long hotPlaceId;

    Long memberId;

    LocalDateTime visitedDate;
}
