package com.ssafy.arthorizon.service.Entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name="reportTypeTb")
@Data
public class ReportTypeEntity {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reportTypeSeq;

    @Column
    private String reportType;


}
