package com.ssafy.arthorizon.service.Entity;

import com.ssafy.arthorizon.admin.AdminEntity;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@DynamicUpdate
@Table(name="reportTb")
@Data
public class ReportEntity {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reportSeq;

    @ManyToOne
    @JoinColumn(name="reporterSeq", referencedColumnName = "userSeq")
    private UserEntity reporter;

    @ManyToOne
    @JoinColumn(name="reportingSeq", referencedColumnName = "userSeq")
    private UserEntity reporting;

    @ManyToOne
    @JoinColumn(name="reportAdminSeq", referencedColumnName = "adminSeq")
    private AdminEntity reportAdmin;

    @ManyToOne
    @JoinColumn(name="reportTypeSeq", referencedColumnName = "reportTypeSeq")
    private ReportTypeEntity reportType;

    @Column
    @Temporal(TemporalType.DATE)
    private Date reportAt;

    @Column
    private String reportIsHandle;
}
