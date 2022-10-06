package com.ssafy.arthorizon.user.dto;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ArtistPageDto {
    private int totalPage;
    private int page;
    private List<ArtistDto> artistDtoList;

    public ArtistPageDto(){}

    public ArtistPageDto(int totalPage, int page, List<UserEntity> userEntities){
        this.totalPage=totalPage;
        this.page=page;

        // artistDtoList를 채우기 위한 리스트 작성
        this.artistDtoList = new ArrayList<ArtistDto>();
        // 모든 유저엔티티에 대해 artistDto로 변환
        for(UserEntity user:userEntities) {
            artistDtoList.add(new ArtistDto(user));
        }

    }
}
