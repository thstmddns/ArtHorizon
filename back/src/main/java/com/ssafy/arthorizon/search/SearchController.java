package com.ssafy.arthorizon.search;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    // 작품명 검색
    @PostMapping("/pieces")
    public ResponseEntity<PiecePageDto> searchByTitle(@RequestBody Map<String, String> keyword, @RequestParam int page) {
        PiecePageDto piecePageDto = searchService.searchByTitleService(keyword.get("pieceTitle"), page);
        if(piecePageDto.getResult()== PieceDto.PieceResult.SUCCESS) {
            return new ResponseEntity<>(piecePageDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

//    // 작가명 검색
//    @PostMapping("/artists")
//    public ResponseEntity<PiecePageDto> searchByArtist(@RequestBody String artistName, @RequestParam int page) {
//
//    }
//
//    // 사용자 검색
//    @PostMapping("/users")
//    public ResponseEntity<ArtistPageDto> searchByNickname(@RequestBody String userNickname, @RequestParam int page) {
//
//    }
//
//    // 태그 검색
//    @PostMapping("/tag")
//    public ResponseEntity<PiecePageDto> searchByTag(@RequestBody String tag, @RequestParam int page) {
//
//    }


}
