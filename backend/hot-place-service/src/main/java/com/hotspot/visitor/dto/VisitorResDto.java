package com.hotspot.visitor.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class VisitorResDto {

    Long hotPlaceId;

    Long memberId;

    LocalDate visitedDate;
}
