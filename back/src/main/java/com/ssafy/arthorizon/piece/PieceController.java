package com.ssafy.arthorizon.piece;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.piece.dto.TagDto;
import com.ssafy.arthorizon.user.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pieces")
public class PieceController {

    private final PieceService pieceService;
    private final JwtService jwtService;

    public PieceController(PieceService pieceService, JwtService jwtService) {
        this.pieceService = pieceService;
        this.jwtService = jwtService;
    }

    // 작품 목록 최신순 조회 페이지네이션
    @GetMapping("/recent")
    public ResponseEntity<PiecePageDto> pieceListRecent(@RequestParam("page") int page){
        PiecePageDto piecePageDto = pieceService.pieceListService(page, "recent");
        if(piecePageDto.getResult()== PieceDto.PieceResult.SUCCESS){
            return new ResponseEntity<>(piecePageDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    // 작품 목록 북마크순 조회 페이지네이션
    @GetMapping("/popular")
    public ResponseEntity<PiecePageDto> pieceListPopular(@RequestParam("page") int page){
        PiecePageDto piecePageDto = pieceService.pieceListService(page, "popular");
        if(piecePageDto.getResult()== PieceDto.PieceResult.SUCCESS){
            return new ResponseEntity<>(piecePageDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // 작품 목록 랜덤 조회 페이지네이션 (중복처리 안함)
    @GetMapping("/random")
    public ResponseEntity<PiecePageDto> pieceListRandom(@RequestParam("page") int page){
        PiecePageDto piecePageDto = pieceService.pieceListRandomService(page);
        if(piecePageDto.getResult()== PieceDto.PieceResult.SUCCESS){
            return new ResponseEntity<>(piecePageDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // 단일 작품 조회
    @GetMapping("/{pieceSeq}")
    public ResponseEntity<PieceDto> pieceOne(@RequestHeader("jwt") String jwt, @PathVariable Long pieceSeq){

        PieceDto pieceDto;

        if (jwt.isEmpty()) {
            pieceDto = pieceService.pieceOne(pieceSeq, (long) 0);
        } else {
            Long userSeq = jwtService.getUserSeq(jwt);
            pieceDto = pieceService.pieceOne(pieceSeq, userSeq);
        }

        if(pieceDto.getResult() == PieceDto.PieceResult.SUCCESS){
            return new ResponseEntity<>(pieceDto,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }

    }

    // 태그 조회
    @GetMapping("/tag")
    public ResponseEntity<List<TagDto>> tagMain(){
        List<TagDto> tagDtoList = pieceService.tagMainService();
        return new ResponseEntity<>(tagDtoList, HttpStatus.OK);
    }

    // 향으로 랜덤 세 개 뽑아주기
    @GetMapping("/scent/{scent}")
    public ResponseEntity<List<PieceListDto>> pieceByScent(@PathVariable String scent) {
        List<PieceListDto> listDtos = pieceService.pieceByScentService(scent);
        return new ResponseEntity<>(listDtos, HttpStatus.OK);
    }

    // 메인 화면에 쓰일 하나의 작품 뽑기
    @GetMapping("/main")
    public ResponseEntity<PieceListDto> pieceForMain() {
        PieceListDto pieceListDto = pieceService.pieceForMainService();
        return new ResponseEntity<>(pieceListDto, HttpStatus.OK);
    }
}
