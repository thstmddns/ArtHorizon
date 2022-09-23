package com.ssafy.arthorizon.piece.dto;

import com.ssafy.arthorizon.piece.PieceEntity;
import lombok.Data;

@Data
public class PieceListDto {
    private Long pieceSeq;
    private String pieceTitle;
    private String pieceArtist;
    private String pieceImg;

    // 생성자
    public PieceListDto(PieceEntity pieceEntity){
        this.pieceSeq=pieceEntity.getPieceSeq();
        this.pieceTitle=pieceEntity.getPieceTitleKr();
        this.pieceImg=pieceEntity.getPieceImg();

        if(pieceEntity.getPieceType().equals("M")){
            // 명화인 경우
            this.pieceArtist=pieceEntity.getPieceArtistKr();
        } else if(pieceEntity.getPieceType().equals("A")){
            // 유저 아트인 경우
            this.pieceArtist=pieceEntity.getPieceArtist().getUserNickname();
        }

    }

}
