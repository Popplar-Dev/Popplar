package com.hotspot.visitor.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class VisitorReqDto {

    Long hotPlaceId;

    Long memberId;

    LocalDate visitedDate;
}
