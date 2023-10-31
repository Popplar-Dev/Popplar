package com.popplar.gameservice.controller;

import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        System.out.println(gameDto.toString());
        System.out.println("execute result");
        return gameService.insertGameService(gameDto);
    }
    //점수판을 보고싶을때 게임 결과를 순서대로 보여주는 메서드
    //사용자의 기록 모아보기
    //사용자의 점수가 최고 점수를 넘겼을때 정복자로 반환해주기
}