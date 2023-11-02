package com.hotspot.visitor.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class VisitorReqDto {

    Long hotPlaceId;

    Long memberId;

    LocalDateTime visitedDate;
}
