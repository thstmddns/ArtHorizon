package com.ssafy.arthorizon.piece.Entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name="tagTb")
@Data
public class TagEntity {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long tagSeq;

    @Column
    private String tagTitle;

    @Column
    private String tagImg;

    @Column
    private String tagDesc;

}
