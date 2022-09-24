package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FollowPageDto {
    private int totalPage;
    private int page;
    private List<FollowerListDto> followList;
    private FollowDto.FollowResult result;

    public FollowPageDto() {}

    public FollowPageDto(int totalPage, int page, List<FollowerListDto> followerListDtos) {
        this.totalPage = totalPage;
        this.page = page;
        this.followList = followerListDtos;
    }
}
