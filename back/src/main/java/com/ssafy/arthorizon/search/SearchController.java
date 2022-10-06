package com.ssafy.arthorizon.search;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.user.dto.ArtistDto;
import com.ssafy.arthorizon.user.dto.ArtistPageDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<List<PieceListDto>> searchByTitle(@RequestBody Map<String, String> keyword) {
        List<PieceListDto> pieceListDtos = searchService.searchByTitleService(keyword.get("pieceTitle"));
        return new ResponseEntity<>(pieceListDtos, HttpStatus.OK);
    }

    // 작가명 검색
    @PostMapping("/artists")
    public ResponseEntity<List<PieceListDto>> searchByArtist(@RequestBody Map<String, String> keyword) {
        List<PieceListDto> pieceListDtos = searchService.searchByArtistService(keyword.get("artistName"));
        return new ResponseEntity<>(pieceListDtos, HttpStatus.OK);
    }


    // 사용자 검색
    @PostMapping("/users")
    public ResponseEntity<List<ArtistDto>> searchByNickname(@RequestBody Map<String, String> keyword) {
        List<ArtistDto> artistDtos = searchService.searchByNicknameService(keyword.get("userNickname"));
        // 별도의 예외처리 생략
        return new ResponseEntity<>(artistDtos, HttpStatus.OK);
    }

    // 태그 검색
    @PostMapping("/tags")
    public ResponseEntity<List<PieceListDto>> searchByTag(@RequestBody Map<String, String> keyword) {
        List<PieceListDto> pieceListDtos = searchService.searchByTagService(keyword.get("tag"));
        return new ResponseEntity<>(pieceListDtos, HttpStatus.OK);
    }


}
