package com.ssafy.arthorizon.user.dto;

import lombok.Data;

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


}
