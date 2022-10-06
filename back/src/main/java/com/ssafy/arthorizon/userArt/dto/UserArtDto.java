package com.ssafy.arthorizon.userArt.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserArtDto {

    private String pieceTitleKr;
    private String pieceTitleEn;
    private String pieceDesc;
    private String pieceImg;
    private String pieceTag;
    private String pieceScent;
    private int piecePrice;

}
