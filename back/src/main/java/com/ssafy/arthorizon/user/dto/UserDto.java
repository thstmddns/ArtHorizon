package com.ssafy.arthorizon.user.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userSeq;
    private String userNickname;
    private String userImg;
    private char userIsMe;
    private char userFollowYn;

}
