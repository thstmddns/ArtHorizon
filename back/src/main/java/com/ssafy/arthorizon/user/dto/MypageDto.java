package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;

@Data
public class MypageDto {

    private Long userSeq;
    private String userNickname;
    private String userImg;
    private String userEmail;
    private char userType;
    private int userArtCount;
    private int userFollowingCount;
    private int userFollowerCount;
    private char userIsMe;
    private char userFollowYn;
    private String userDesc;

    private SignupDto.SignupResult result;

    public MypageDto() {}

    public MypageDto(UserEntity userEntity) {
        this.userSeq = userEntity.getUserSeq();
        this.userNickname = userEntity.getUserNickname();
        this.userImg = userEntity.getUserImg();
        this.userEmail = userEntity.getUserEmail();
        this.userType = userEntity.getUserType();
        this.userArtCount = userEntity.getUserArtCount();
        this.userFollowingCount = userEntity.getUserFollowingCount();
        this.userFollowerCount = userEntity.getUserFollowerCount();
        this.userDesc = userEntity.getUserDesc();
    }
}
