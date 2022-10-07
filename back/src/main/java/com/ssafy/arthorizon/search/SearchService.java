package com.ssafy.arthorizon.search;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.user.dto.ArtistDto;
import com.ssafy.arthorizon.user.dto.ArtistPageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PieceRepository pieceRepository;

    private final int LIMIT = 8;

    public List<PieceListDto> searchByTitleService(String title) {
        // limit는 고정

        // page를 통해 offset을 계산
//        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntities = pieceRepository.findByTitle(title);
//        System.out.println(title);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
//        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceTitleKrContainsOrPieceTitleEnContains(title, title)/LIMIT) +1;
//        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
//        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);
//
//        // 반환 상태에 대해서 result기록
//        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);
        List<PieceListDto> pieceListDtos = new ArrayList<>();

        for(PieceEntity pieceEntity:pieceEntities) {
            pieceListDtos.add(new PieceListDto(pieceEntity));
        }
        return pieceListDtos;

    }

    public List<PieceListDto> searchByArtistService(String artist) {
        // limit는 고정

        // page를 통해 offset을 계산
//        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntities = pieceRepository.findByPieceArtist(artist);
//        System.out.println(artist);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
//        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceArtistKrContainsOrPieceArtistEnContains(artist, artist)/LIMIT) +1;
//        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
//        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

        // 반환 상태에 대해서 result기록
//        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);
        List<PieceListDto> pieceListDtos = new ArrayList<>();

        for(PieceEntity pieceEntity:pieceEntities) {
            pieceListDtos.add(new PieceListDto(pieceEntity));
        }
        return pieceListDtos;
    }

    public List<ArtistDto> searchByNicknameService(String nickname) {
        // limit는 고정

        // page를 통해 offset을 계산
//        int offset = LIMIT*(page-1);

        List<UserEntity> userEntities = userRepository.findByNickname(nickname);
//        System.out.println(nickname);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
//        int totalPage = (int) Math.ceil(userRepository.countAllByUserNicknameContains(nickname)/LIMIT) +1;
//        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
//        ArtistPageDto artistPageDto = new ArtistPageDto(totalPage, page, userEntities);

        // 반환 상태 기록 없음
        List<ArtistDto> artistDtos = new ArrayList<>();
        for(UserEntity userEntity: userEntities){
            artistDtos.add(new ArtistDto(userEntity));
        }
        return artistDtos;

    }

    public List<PieceListDto> searchByTagService(String tag) {
        // limit는 고정

        // page를 통해 offset을 계산
//        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntities = pieceRepository.findByTag(tag);
//        System.out.println(tag);

        // 검색 결과가 없을 수도 있으니 비어있는 것은 오류로 잡아내지 않음

        // 전체 작품 목록의 수를 뽑아옴
//        int totalPage = (int) Math.ceil(pieceRepository.countAllByPieceTagContainsOrPieceScentContains(tag, tag)/LIMIT) +1;
//        System.out.println(totalPage);

        // 반환할 페이지 dto를 작성
//        PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

        // 반환 상태에 대해서 result기록
//        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

        List<PieceListDto> pieceListDtos = new ArrayList<>();

        for(PieceEntity pieceEntity:pieceEntities) {
            pieceListDtos.add(new PieceListDto(pieceEntity));
        }
        return pieceListDtos;

    }

}
