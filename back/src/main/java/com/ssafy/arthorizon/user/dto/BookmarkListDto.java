package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import lombok.Data;

@Data
public class BookmarkListDto {
    private Long pieceSeq;
    private String pieceTitleKr;
    private String pieceArtistKr;
    private String pieceImg;

    // 생성자
    public BookmarkListDto(BookmarkEntity bookmarkEntity) {
        this.pieceSeq = bookmarkEntity.getBookmarking().getPieceSeq();
        this.pieceTitleKr = bookmarkEntity.getBookmarking().getPieceTitleKr();
        this.pieceArtistKr = bookmarkEntity.getBookmarking().getPieceArtistKr();
        this.pieceImg = bookmarkEntity.getBookmarking().getPieceImg();
    }
}
