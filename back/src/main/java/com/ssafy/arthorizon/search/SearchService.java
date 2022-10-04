package com.ssafy.arthorizon.search;

import com.ssafy.arthorizon.piece.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.user.dto.ArtistPageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PieceRepository pieceRepository;

    private final int LIMIT = 8;

    public PiecePageDto searchByTitleService(String title, int page) {
        // limit는 고정

        // page를 통해 offset을 계산
        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntity = pieceRepository.findByTitle(LIMIT, offset, title);
        System.out.println(title);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceTitleKrContainsOrPieceTitleEnContains(title, title)/LIMIT);
        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

        // 반환 상태에 대해서 result기록
        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

        return piecePageDto;

    }

    public PiecePageDto searchByArtistService(String artist, int page) {
        // limit는 고정

        // page를 통해 offset을 계산
        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntity = pieceRepository.findByPieceArtist(LIMIT, offset, artist);
        System.out.println(artist);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceArtistKrContainsOrPieceArtistEnContains(artist, artist)/LIMIT);
        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

        // 반환 상태에 대해서 result기록
        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

        return piecePageDto;

    }

//    public ArtistPageDto searchByNicknameService(String nickname, int page) {
//
//    }

    public PiecePageDto searchByTagService(String tag, int page) {
        // limit는 고정

        // page를 통해 offset을 계산
        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntity = pieceRepository.findByTag(LIMIT, offset, tag);
        System.out.println(tag);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceTagContains(tag)/LIMIT);
        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

        // 반환 상태에 대해서 result기록
        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

        return piecePageDto;

    }

}
