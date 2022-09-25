package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import lombok.Data;

import java.util.Objects;

@Data
public class FollowerListDto {
    private Long userSeq;
    private String userNickname;
    private String userImg;
    private char userIsMe;
    private char userFollowYn;

    public FollowerListDto() {}
    public FollowerListDto(FollowEntity followEntity, Long currentUserSeq, char userFollowYn) {

        this.userSeq = followEntity.getFollower().getUserSeq();
        this.userNickname = followEntity.getFollower().getUserNickname();
        this.userImg = followEntity.getFollower().getUserImg();
        this.userFollowYn = userFollowYn;
        if (Objects.equals(this.userSeq, currentUserSeq)) {
            this.userIsMe = 'Y';
        }
        else { this.userIsMe = 'N'; }

    }
}
