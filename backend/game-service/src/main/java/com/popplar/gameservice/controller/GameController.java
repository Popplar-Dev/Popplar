package com.popplar.gameservice.controller;

import com.popplar.gameservice.dto.ConquerorInfoDto;
import com.popplar.gameservice.dto.GameBoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.dto.MyBoardDto;
import com.popplar.gameservice.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    //뭐가 필요할까
    //일단 게임이 종료되었을 때 결과를 저장하는 메서드
    @PostMapping("/insert-result")
    public GameResultDto insertGameResult(@RequestBody GameDto gameDto) {
        return gameService.insertGameService(gameDto);
    }
    //점수판을 보고싶을때 게임 결과를 순서대로 보여주는 메서드
    @GetMapping("/get-game-board/{hotPlaceId}/{type}")
    public GameBoardDto getGameBoard(@PathVariable Long hotPlaceId, @PathVariable String type){
        return gameService.getGameBoard(hotPlaceId, type);
    }
    //사용자의 기록 모아보기
    @GetMapping("/get-my-stat/{hotPlaceId}/{type}")
    public MyBoardDto getMyGameBoard(@RequestHeader("Member-Id") Long memberId,@PathVariable Long hotPlaceId, @PathVariable String type){
        return gameService.getMyGameBoard(memberId, hotPlaceId, type);
    }

    //정복자 보여주기
    @GetMapping("/get-conqueror-info/{hotPlaceId}")
    public ConquerorInfoDto getConquerorInfo(@PathVariable Long hotPlaceId){
        return gameService.getConquerorInfo(hotPlaceId);
    }
}
