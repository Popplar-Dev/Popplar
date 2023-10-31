package com.popplar.gameservice.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameBoardDto {
    List<GameDto> gameDtoList;
}
