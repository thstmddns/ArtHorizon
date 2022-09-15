package com.ssafy.service;

import com.ssafy.repository.PlanGrandRepository;
/*import com.ssafy.dto.PlanDetailDto;
import com.ssafy.dto.PlanDetailSubDto;
import com.ssafy.dto.PlanListDto;
import com.ssafy.dto.PlanUpdateDto;*/
import com.ssafy.entity.PlanGrand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PlanGrandServiceImpl implements PlanGrandService {
	@Autowired
	private PlanGrandRepository pGR;

/*	@Autowired
	private PlanSmallRepository pSR;*/

	@Override
	public List<PlanGrand> findAll() {
		List<PlanGrand> plangrands = new ArrayList<>();
		pGR.findAll().forEach(e->plangrands.add(e));
		return plangrands;
	}

	@Override
	public Optional<PlanGrand> findbyId(Long grandplanSeq) {
		Optional<PlanGrand> plangrand = pGR.findById(grandplanSeq);
		return plangrand;
	}

	@Override
	public int deleteById(Long grandplanSeq) {
		Optional<PlanGrand> e = pGR.findById(grandplanSeq);

		if(e.isPresent()) {
			/*
			 * if(e.get().getGrandplanIsmatch()) { // 매칭 중이므로 삭제 불가 return 1; } else
			 *//*
				 * if(e.get().getGrandplanIsdone()) { // 완료 상태이므로 삭제 불가 return 2; } else {
				 */
				// 제약 조건에 해당하지 않으므로 삭제 가능
				pGR.deleteById(grandplanSeq);
				return 0;
				/* } */
		} else {
			return 3;
		}

	}

	@Override
	public PlanGrand save(PlanGrand plangrand) {

		//다 만들었으니까 등록한다
		pGR.save(plangrand);
		return plangrand;
	}

	@Override
	public void updateById(Long grandplanSeq, PlanGrand plangrand) {
		Optional<PlanGrand> e = pGR.findById(grandplanSeq);

		if(e.isPresent()) {
			e.get().setGrandplanTitle(plangrand.getGrandplanTitle());
			e.get().setGrandplanDesc(plangrand.getGrandplanDesc());
			pGR.save(plangrand);
		}

	}

	/*@Override
	public int updateByDto(PlanUpdateDto updatedto) {
		Optional<PlanGrand> e = pGR.findById(updatedto.getPlanSeq());

		if(e.isPresent()) {
			*//*
			 * if(e.get().getGrandplanIsmatch()) { // 매칭 중이므로 수정 불가 return 1; } else
			 *//**//*
				 * if(e.get().getGrandplanIsdone()) { // 완료 상태이므로 수정 불가 return 2; } else {
				 *//*
				switch(updatedto.getUpdateType()) {
				case "title":
					e.get().setGrandplanTitle(updatedto.getUpdateContent()); break;
				case "desc":
					e.get().setGrandplanDesc(updatedto.getUpdateContent()); break;
				case "startdate":
					Calendar start = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
					SimpleDateFormat sdfStart = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
					try {
						Date date = sdfStart.parse(updatedto.getUpdateContent());
						start.setTime(date);
						e.get().setGrandplanStartdate(start);
					} catch (ParseException e1) {
						e1.printStackTrace();
					} break;
				case "enddate":
					Calendar end = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
					SimpleDateFormat sdfEnd = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
					try {
						Date date = sdfEnd.parse(updatedto.getUpdateContent());
						end.setTime(date);
						e.get().setGrandplanEnddate(end);
					} catch (ParseException e1) {
						e1.printStackTrace();
					} break;
				case "color":
					try {
						e.get().setGrandplanColor(updatedto.getUpdateContent()); break;
					} catch(NumberFormatException e1) {
						e1.printStackTrace();
					}
				}
				pGR.save(e.get());
				return 0;
				*//* } *//*
		} else {
			return 3;
		}
	}*/

	@Override
	public List<PlanGrand> findByUser_UserUid(String uid) {
		return pGR.findByUser_UserUid(uid);
	}

/*	// 대플랜~태스크 상세조회
	@Override
	public PlanDetailDto getDetail(Long seq) {
		Optional<PlanGrand> plangrand = pGR.findById(seq);

		// 대플랜 조회해서 PlanDetailDto에 필요한 만큼 채워넣음
		PlanDetailDto plandetail = new PlanDetailDto();
		plandetail.setGrandplanSeq(seq);
		plandetail.setGrandplanTitle(plangrand.get().getGrandplanTitle());
		plandetail.setGrandplanDesc(plangrand.get().getGrandplanDesc());

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		plandetail.setGrandplanStart(sdf.format(plangrand.get().getGrandplanStartdate().getTimeInMillis()));
		plandetail.setGrandplanEnd(sdf.format(plangrand.get().getGrandplanEnddate().getTimeInMillis()));

		plandetail.setGrandplanColor(plangrand.get().getGrandplanColor());
		plandetail.setToday(LocalDate.now());

		// 어쩐지 소플랜의 중플랜의 대플랜의 대플랜시퀀스를 가지고 찾아내는 쿼리를 짰다
		// 그렇게 걸러낸 소플랜들을 DTO 형태에 맞춰 배치
		List<PlanDetailSubDto> plandetailsub = pSR.findByPlanmid_Plangrand_GrandplanSeq(seq).stream().map(
				m->{
					PlanDetailSubDto subdto = new PlanDetailSubDto();

					subdto.setSmallplanDate(sdf.format(m.getSmallplanDate().getTimeInMillis()));
					subdto.setSmallplanSeq(m.getSmallplanSeq());

					if(m.getSmallplanTttask()>0) {
						subdto.setHasTask(true);
					} else {
						subdto.setHasTask(null);
					}

					subdto.setMidplanSeq(m.getPlanmid().getMidplanSeq());
					subdto.setMidplanTitle(m.getPlanmid().getMidplanTitle());
					subdto.setMidplanColor(m.getPlanmid().getMidplanColor());
					subdto.setMidplanStart(sdf.format(m.getPlanmid().getMidplanStartdate().getTimeInMillis()));

					return subdto;
				}
			).collect(Collectors.toList());

		// 저 List<PlanDetailSubDto>를 PlanDetailDto에 집어넣고 반환한다
		plandetail.setSubDto(plandetailsub);
		return plandetail;
	}


	@Override
	public List<PlanListDto> getMatchPlan(String uid){
		List<PlanListDto> list = pGR.findByUser_UserUidAndGrandplanIsmatchFalseAndGrandplanIsdoneFalse(uid).stream().map(
				m->{
						PlanListDto listdto = new PlanListDto();
						listdto.setPlanSeq(m.getGrandplanSeq());
						listdto.setPlanTitle(m.getGrandplanTitle());
						return listdto;
					}
				).collect(Collectors.toList());

		return list;
	}*/


}
