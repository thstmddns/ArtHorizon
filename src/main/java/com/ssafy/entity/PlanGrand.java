package com.ssafy.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Calendar;

@Entity
@DynamicUpdate
@Table(name = "PLAN_GRAND_TB")
@Data
public class PlanGrand {

   //pk, 대플랜 seq
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="GRANDPLAN_SEQ")
   private Long grandplanSeq;

   @ManyToOne
   @JoinColumn(name="USER_UID", referencedColumnName="USER_UID")
   private User user;

   //대플랜 제목
   @Column(name="GRANDPLAN_TITLE")
   private String grandplanTitle;

   //대플랜 설명
   @Column(name="GRANDPLAN_DESC")
   private String grandplanDesc;

   //대플랜 시작일
   @Column(name="GRANDPLAN_STARTDATE")
   @Temporal(TemporalType.DATE)
   private Calendar grandplanStartdate;

   //대플랜 종료일
   @Column(name="GRANDPLAN_ENDDATE")
   @Temporal(TemporalType.DATE)
   private Calendar grandplanEnddate;

   //대플랜 달성여부
   @Column(name="GRANDPLAN_ISDONE")
   private Boolean grandplanIsdone;

   //대플랜 매칭여부
   @Column(name="GRANDPLAN_ISMATCH")
   private Boolean grandplanIsmatch;

   //대플랜 안의 중플랜 수
   @Column(name="GRANDPLAN_TTMPLAN")
   private Integer grandplanTtmplan;

   //대플랜 안의 달성된 중플랜 수
   @Column(name="GRANDPLAN_TDMPLAN")
   private Integer grandplanTdmplan;

   //대플랜 테마컬러
   @Column(name="GRANDPLAN_COLOR")
   private String grandplanColor;

}