package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;

@Data
public class ArtistDto {

    private Long userSeq;
    private String userNickname;
    private String userDesc;
    private String userImg;

    public ArtistDto(){}

    public ArtistDto(UserEntity userEntity) {
        this.userSeq = userEntity.getUserSeq();
        this.userNickname = userEntity.getUserNickname();
        this.userDesc = userEntity.getUserDesc();
        this.userImg = userEntity.getUserImg();
    }

}
