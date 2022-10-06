package com.ssafy.arthorizon.piece.dto;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import lombok.Data;

@Data
public class PieceDto {
    public enum PieceResult {
        SUCCESS, FAILURE, NO_SUCH_PIECE,
    }

    // dto 구성하고
    private Long pieceSeq;
    private String pieceType;
    private String pieceTitleKr;
    private String pieceTitleEn;
    private String pieceArtistKr;
    private String pieceArtistEn;
    private Long pieceArtistSeq;
    private String pieceDesc;
    private String pieceImg;
    private int pieceHitCount;
    private int pieceBookmarkCount;
    private String pieceTag;
    private Integer pieceYear;
    private int pieceCentury;
    private String pieceStyle;
    private String pieceGenre;
    private String pieceScent;
    private int piecePrice;

    private char pieceBookmarkYn;
    private char pieceCollectYn;

    private PieceResult result;

    public PieceDto(){}

    // 생성자 만들어서 엔티티에서 dto로 바로 전환되게 하기
    public PieceDto(PieceEntity pieceEntity){
        this.pieceSeq=pieceEntity.getPieceSeq();
        this.pieceArtistSeq=pieceEntity.getPieceSeq();
        this.pieceType=pieceEntity.getPieceType();
        this.pieceTitleKr=pieceEntity.getPieceTitleKr();
        this.pieceTitleEn=pieceEntity.getPieceTitleEn();
        if(pieceEntity.getPieceType().equals("M")){
            // 명화인 경우
            this.pieceArtistKr=pieceEntity.getPieceArtistKr();
        } else if(pieceEntity.getPieceType().equals("A")){
            // 유저 아트인 경우
            this.pieceArtistKr=pieceEntity.getPieceArtist().getUserNickname();
        }
        this.pieceArtistEn=pieceEntity.getPieceArtistEn();
        this.pieceArtistSeq=pieceEntity.getPieceArtist().getUserSeq();
        this.pieceDesc=pieceEntity.getPieceDesc();
        this.pieceImg=pieceEntity.getPieceImg();
        this.pieceHitCount=pieceEntity.getPieceHitCount();
        this.pieceBookmarkCount=pieceEntity.getPieceBookmarkCount();
        this.pieceTag=pieceEntity.getPieceTag();
        this.pieceYear=pieceEntity.getPieceYear();
        this.pieceCentury=pieceEntity.getPieceCentury();
        this.pieceStyle=pieceEntity.getPieceStyle();
        this.pieceGenre=pieceEntity.getPieceGenre();
        this.pieceScent=pieceEntity.getPieceScent();
        this.piecePrice=pieceEntity.getPiecePrice();
    }


}
