package com.ssafy.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlanSmallDto {

	// 소플랜 시퀀스
	private Long smallplanSeq;

	// 그 소플랜의 날짜
	private String smallplanDate;

	// 소속 중플랜 시퀀스
	private Long midplanSeq;

	// 중플랜 이름
	private String midplanTitle;

	// 중플랜 설명
	private String midplanDesc;

	// 중플랜 시작일
	private String midplanStart;

	// 중플랜 종료일
	private String midplanEnd;

	// 중플랜 색
	private String midplanColor;

	// 소속 대플랜 시퀀스
	private Long grandplanSeq;

/*	// 소속 태스크 리스트
	private List<PlanTaskDto> plantaskList;*/

}
