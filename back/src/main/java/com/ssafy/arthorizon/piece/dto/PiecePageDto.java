package com.ssafy.arthorizon.piece.dto;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PiecePageDto {

    private int totalPage;
    private int page;
    private List<PieceListDto> pieceList;
    private PieceDto.PieceResult result;

    public PiecePageDto(){}

    public PiecePageDto(int totalPage, int page, List<PieceEntity> pieceEntity){
        this.totalPage=totalPage;
        this.page=page;

        // 리스트dto를 담을 리스트를 작성
        this.pieceList=new ArrayList<PieceListDto>();
        // 입력받은 모든 작품엔티티 목록에 대해서
        for(PieceEntity piece:pieceEntity){
            // 엔티티-->리스트dto변환
            pieceList.add(new PieceListDto(piece));
        }
    }

}
