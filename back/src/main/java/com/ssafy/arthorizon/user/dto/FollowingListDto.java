package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import lombok.Data;

import java.util.Objects;

@Data
public class FollowingListDto {
    private Long userSeq;
    private String userNickname;
    private String userImg;
    private char userIsMe;
    private char userFollowYn;

    public FollowingListDto() {}
    public FollowingListDto(FollowEntity followEntity, Long currentUserSeq, char userFollowYn) {

        this.userSeq = followEntity.getFollowing().getUserSeq();
        this.userNickname = followEntity.getFollowing().getUserNickname();
        this.userImg = followEntity.getFollowing().getUserImg();
        this.userFollowYn = userFollowYn;
        if (Objects.equals(this.userSeq, currentUserSeq)) {
            this.userIsMe = 'Y';
        }
        else { this.userIsMe = 'N'; }

    }
}
