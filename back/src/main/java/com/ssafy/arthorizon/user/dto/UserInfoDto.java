package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;

@Data
public class UserInfoDto {
    private Long userSeq;
    private String userNickname;
    private String userEmail;
    private String userImg;
    private char userType;

    private String userDesc;

    public UserInfoDto() {}

    public UserInfoDto(UserEntity userEntity) {
        this.userSeq = userEntity.getUserSeq();
        this.userNickname = userEntity.getUserNickname();
        this.userEmail = userEntity.getUserEmail();
        this.userImg = userEntity.getUserImg();
        this.userType = userEntity.getUserType();
        this.userDesc = userEntity.getUserDesc();
    }
}
