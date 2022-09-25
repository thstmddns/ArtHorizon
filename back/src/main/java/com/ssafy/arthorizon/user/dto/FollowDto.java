package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;

@Data
public class FollowDto {

    public enum FollowResult {
        SUCCESS, FAILURE, NO_SUCH_USER, EMPTY
    }

    private Long followSeq;

    private UserEntity follower;

    private UserEntity following;

    public FollowDto() {}

    public FollowDto(FollowEntity followEntity) {
        this.followSeq = followEntity.getFollowSeq();
        this.follower = followEntity.getFollower();
        this.following = followEntity.getFollowing();
    }
}
