package com.popplar.gameservice.dto;

import com.popplar.gameservice.service.CryptService;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyBoardDto {

    private final CryptService cryptService;

    private List<GameDto> gameDtoList;

    public void encryptGameDtoList(CryptService cryptService){
        for(GameDto gameDto : this.gameDtoList){
            gameDto.setMemberId(cryptService.encrypt(gameDto.getMemberId()));
        }
    }
}
