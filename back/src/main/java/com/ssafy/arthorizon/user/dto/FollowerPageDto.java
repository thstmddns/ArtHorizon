package com.ssafy.arthorizon.user.dto;

import lombok.Data;

import java.util.List;

@Data
public class FollowerPageDto {
    private int totalPage;
    private int page;
    private List<FollowerListDto> followList;
    private FollowDto.FollowResult result;

    public FollowerPageDto() {}

    public FollowerPageDto(int totalPage, int page, List<FollowerListDto> followerListDtos) {
        this.totalPage = totalPage;
        this.page = page;
        this.followList = followerListDtos;
    }
}
