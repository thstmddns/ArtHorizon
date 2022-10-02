package com.ssafy.arthorizon.piece.dto;

import com.ssafy.arthorizon.piece.TagEntity;
import lombok.Data;

import java.util.List;

@Data
public class TagDto {

    private Long tagSeq;
    private String tagTitle;
    private String tagImg;
    private String tagDesc;

    public TagDto(){}

    public TagDto(TagEntity tagEntity){
        this.tagSeq = tagEntity.getTagSeq();
        this.tagTitle = tagEntity.getTagTitle();
        this.tagImg = tagEntity.getTagImg();
        this.tagDesc = tagEntity.getTagDesc();
    }

}
