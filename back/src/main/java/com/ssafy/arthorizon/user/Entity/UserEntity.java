package com.ssafy.arthorizon.user.Entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@DynamicUpdate
@Table(name = "userTb")
@Data
public class UserEntity {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long userSeq;

    @Column
    private String userEmail;

    @Column
    private String userPassword;

    @Column
    private String userNickname;

    @Column
    private String userDesc;

    @Column
    private String userImg;

    @Column
    private char userType;

    @Column
    private int userArtCount;

    @Column
    private int userFollowingCount;

    @Column
    private int userFollowerCount;

    @Column
    private char userIsStop;

    @Column
    @Temporal(TemporalType.DATE)
    private Date userSignAt;

    @Column
    @Temporal(TemporalType.DATE)
    private Date userStopExpire;

}
