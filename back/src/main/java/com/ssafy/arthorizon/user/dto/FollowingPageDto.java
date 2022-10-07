package com.ssafy.arthorizon.user.dto;

import lombok.Data;

import java.util.List;

@Data
public class FollowingPageDto {
    private int totalPage;
    private int page;
    private List<FollowingListDto> followList;
    private FollowDto.FollowResult result;

    public FollowingPageDto() {}
    public FollowingPageDto(int totalPage, int page, List<FollowingListDto> followingListDtos) {
        this.totalPage = totalPage;
        this.page = page;
        this.followList = followingListDtos;
    }
}
