package com.ssafy.arthorizon.piece;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PieceService {

    @Autowired
    private PieceRepository pieceRepository;

    private final int LIMIT = 8;

    public PiecePageDto pieceListRecentService(int page) {
        // limit는 고정

        // page를 통해 offset을 계산
        int offset = LIMIT*(page-1);

        // 해당하는 옵션대로 작품 목록을 뽑아옴
        List<PieceEntity> pieceEntity = pieceRepository.findRecentList(LIMIT,offset);

        if(pieceEntity.isEmpty()){
            // 아까 조사해온게 비어있으면
            PiecePageDto piecePageDto = new PiecePageDto();
            piecePageDto.setResult(PieceDto.PieceResult.FAILURE);
            return piecePageDto;
        } else {
            // 제대로 되어있으면
            // 전체 작품 목록의 수를 뽑아옴
            int totalPage = (int) Math.ceil((pieceRepository.countAllBy())/LIMIT);

            // 반환할 페이지 dto를 작성
            PiecePageDto piecePageDto = new PiecePageDto(totalPage, page,pieceEntity);

            // 반환 상태에 대해서 result 기록
            piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

            return piecePageDto;
        }

    }

    // 작품 목록 북마크순 조회 페이지네이션
//    public PiecePageDto pieceListPopularService(int page) {
//
//
//
//
//    }

    // 단일 작품 조회
    public PieceDto pieceOne(Long pieceSeq) {
        PieceEntity entity = pieceRepository.findByPieceSeq(pieceSeq);
        PieceDto dto = new PieceDto(entity);
        return dto;
    }



    // 태그 조회

}
