package com.ssafy.arthorizon.admin;

import lombok.Cleanup;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name="adminTb")
@Data
public class AdminEntity {

    // pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long adminSeq;

    @Column
    private String adminEmail;

    @Column
    private String adminPassword;

    @Column
    private String adminNickname;

}
