package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;


@Data
public class BookmarkDto {

    public enum BookmarkResult {
        SUCCESS, FAILURE, NO_SUCH_USER, NO_SUCH_PIECE, ALREADY_BOOKMARK
    }
    private Long bookmarkSeq;

    private UserEntity bookmarker;

    private PieceEntity bookmarking;

    private BookmarkResult result;

    public BookmarkDto() {}

    public BookmarkDto(BookmarkEntity bookmarkEntity) {
        this.bookmarkSeq = bookmarkEntity.getBookmarkSeq();
        this.bookmarker = bookmarkEntity.getBookmarker();
        this.bookmarking = bookmarkEntity.getBookmarking();
    }


}
