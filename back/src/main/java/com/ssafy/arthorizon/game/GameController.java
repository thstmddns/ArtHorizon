package com.ssafy.arthorizon.game;

import com.ssafy.arthorizon.piece.dto.PieceListDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("")
    public ResponseEntity<List<PieceListDto>> gameWorldCupList(){

        try{
            List<PieceListDto> pieceListDtos = gameService.gameWorldCupListService();
            return new ResponseEntity<>(pieceListDtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }



}
