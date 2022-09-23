package com.ssafy.arthorizon.piece;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pieces")
public class PieceController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";

    private final PieceService pieceService;

    public PieceController(PieceService pieceService) {
        this.pieceService = pieceService;
    }

    // 작품 목록 최신순 조회 페이지네이션
    @GetMapping("/recent")
    public ResponseEntity<PiecePageDto> pieceListRecent(@RequestParam("page") int page){
        PiecePageDto piecePageDto = pieceService.pieceListRecentService(page);
        if(piecePageDto.getResult()== PieceDto.PieceResult.SUCCESS){
            return new ResponseEntity<>(piecePageDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(piecePageDto, HttpStatus.BAD_REQUEST);
        }
    }


    // 작품 목록 북마크순 조회 페이지네이션
//    @GetMapping("/popular")
//    public List<PieceEntity> pieceListRecent(@RequestParam("page") int page){
//        return pieceService.pieceListRecentService(page);
//    }

    // 단일 작품 조회
    @GetMapping("/{pieceSeq}")
    public PieceDto pieceOne(@PathVariable Long pieceSeq){
        return pieceService.pieceOne(pieceSeq);
    }

    // 태그 조회
}
