package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BookmarkPageDto {
    private int totalPage;
    private int page;
    private List<BookmarkListDto> bookmarkList;
    private BookmarkDto.BookmarkResult result;

    public BookmarkPageDto(){}

    public BookmarkPageDto(int totalPage, int page, List<BookmarkEntity> bookmarkEntity){
        this.totalPage=totalPage;
        this.page=page;

        // 리스트dto를 담을 리스트를 작성
        this.bookmarkList=new ArrayList<BookmarkListDto>();
        // 입력받은 모든 작품엔티티 목록에 대해서
        for(BookmarkEntity bookmark:bookmarkEntity){
            // 엔티티-->리스트dto변환
            bookmarkList.add(new BookmarkListDto(bookmark));
        }
    }
}
