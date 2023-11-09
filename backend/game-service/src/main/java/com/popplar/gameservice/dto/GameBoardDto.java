package com.popplar.gameservice.dto;

import com.popplar.gameservice.service.CryptService;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameBoardDto {

    List<BoardDto> boardDtoList;

    public void encryptGameDtoList(CryptService cryptService){
        for(BoardDto boardDto : this.boardDtoList){
            boardDto.setMemberId(cryptService.encrypt(boardDto.getMemberId()));
        }
    }
}
