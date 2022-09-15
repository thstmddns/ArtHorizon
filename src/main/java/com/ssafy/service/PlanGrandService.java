package com.ssafy.service;

/*import com.ssafy.dto.PlanDetailDto;
import com.ssafy.dto.PlanListDto;
import com.ssafy.dto.PlanUpdateDto;*/
import com.ssafy.entity.PlanGrand;

import java.util.List;
import java.util.Optional;

public interface PlanGrandService {
	public List<PlanGrand> findAll();

	public Optional<PlanGrand> findbyId(Long grandplanSeq);

	public int deleteById(Long grandplanSeq);

	public PlanGrand save(PlanGrand plangrand);

	public void updateById(Long grandplanSeq, PlanGrand plangrand);

	// 여기까지 기본 CRUD

/*	// 대플랜 정보 업데이트
	public int updateByDto(PlanUpdateDto planupdatedto);*/

	// 대플랜 단순목록 조회
	public List<PlanGrand> findByUser_UserUid(String uid);

/*	// 대플랜과 상세내역 조회
	public PlanDetailDto getDetail(Long seq);

	List<PlanListDto> getMatchPlan(String uid);*/

}
