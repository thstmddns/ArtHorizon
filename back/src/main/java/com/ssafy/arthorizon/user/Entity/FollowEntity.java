package com.ssafy.arthorizon.user.Entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name = "followTb")
@Data
public class FollowEntity {
    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long followSeq;

    @ManyToOne
    @JoinColumn(name="followerSeq", referencedColumnName = "userSeq")
    private UserEntity follower;

    @ManyToOne
    @JoinColumn(name="followingSeq", referencedColumnName = "userSeq")
    private UserEntity following;
}
