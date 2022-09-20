package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.UserEntity;
import lombok.Data;

import java.sql.Date;

@Data
public class SignupDto {
    public enum SignupResult {
        SUCCESS, FAILURE, NO_SUCH_USER,
    }
    private Long userSeq;
    private String userEmail;
    private String userPassword;
//    private String userNickname;
//    private char userType;
//    private Date userSignAt;
    private SignupResult result;


//    public SignupDto(UserEntity userEntity) {
//        this.userEmail = userEntity.getUserEmail();
////        this.userNickname = userEntity.getUserNickname();
//        this.userSeq = userEntity.getUserSeq();
//        this.userPassword = userEntity.getUserPassword();
//
//    }
//
//    public SignupDto() {
//
//    }
}
