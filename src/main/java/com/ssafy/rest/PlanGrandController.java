package rest;

import com.ssafy.hibernate.dto.PlanDetailDto;
import com.ssafy.hibernate.dto.PlanHomeDto;
import com.ssafy.hibernate.dto.PlanListDto;
import com.ssafy.hibernate.dto.PlanUpdateDto;
import com.ssafy.hibernate.entity.PlanGrand;
import com.ssafy.hibernate.service.PlanGrandService;
import com.ssafy.hibernate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plangrands")
public class PlanGrandController {

	@Autowired
	PlanGrandService pGS;

	@Autowired
	UserService uS;

	// http://아이피/plangrands/{유저아이디}
	// 해당 유저에 해당하는 대플랜 목록 조회 (get)
	@GetMapping("/{uid}")
	public List<PlanListDto> getPlanGrandList(@PathVariable("uid") String uid) {
		List<PlanListDto> planlists = pGS.findByUser_UserUid(uid).stream().map(
				m->{
					PlanListDto planlistdto = new PlanListDto();
					planlistdto.setPlanSeq(m.getGrandplanSeq());
					planlistdto.setPlanTitle(m.getGrandplanTitle());
					return planlistdto;
				}
			).collect(Collectors.toList());

		return planlists;
	}

	// http://아이피/plangrands/home/{유저아이디}
	// 해당 유저에 해당하는 대플랜 목록 (달성률 포함) 조회 (get)
	@GetMapping("/home/{uid}")
	public List<PlanHomeDto> getPlanGrandHome(@PathVariable("uid") String uid) {
		List<PlanHomeDto> planlists = pGS.findByUser_UserUid(uid).stream().map(
				m->{
					PlanHomeDto planhomedto = new PlanHomeDto();
					planhomedto.setPlanSeq(m.getGrandplanSeq());
					planhomedto.setPlanTitle(m.getGrandplanTitle());

					int TTMplan = m.getGrandplanTtmplan();
					int TDMplan = m.getGrandplanTdmplan();

					if(TTMplan==0) {
						planhomedto.setPlanRate(0);
					} else {
						planhomedto.setPlanRate((TDMplan/TTMplan)*100);
					}

					return planhomedto;
				}
			).collect(Collectors.toList());

		return planlists;
	}

	// http://아이피/plangrands/detail/{대플랜시퀀스}
	// 대플랜 시퀀스에 따라서 상세조회화면에 들어갈 데이터를 싹 조회 (get)
	@GetMapping("/detail/{seq}")
	public PlanDetailDto getPlanDetail(@PathVariable("seq") Long seq) {
		return pGS.getDetail(seq);
	}

	@PostMapping("")
	public PlanGrand addPlanGrand(@RequestBody Map<String, String> vo) {

		PlanGrand plangrand = new PlanGrand();

		// 채워넣어야 할 것
		// uid --> user
		// 대플랜 제목
		// 대플랜 설명
		// 대플랜 색
		plangrand.setUser(uS.findById(vo.get("uid")).get());
		plangrand.setGrandplanTitle(vo.get("grandplanTitle"));
		plangrand.setGrandplanDesc(vo.get("grandplanDesc"));
		plangrand.setGrandplanColor(vo.get("grandplanColor"));

		// 대플랜 시작일
		// 대플랜 종료일
		Calendar startcalendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
		Calendar endcalendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
		try {
			Date startdate = sdf.parse(vo.get("grandplanStartdate"));
			Date enddate = sdf.parse(vo.get("grandplanEnddate"));

			startcalendar.setTime(startdate);
			endcalendar.setTime(enddate);

			plangrand.setGrandplanStartdate(startcalendar);
			plangrand.setGrandplanEnddate(endcalendar);

		} catch (ParseException e) {
			e.printStackTrace();
		}

		// 달성여부, 매칭여부, 그 외의 것들 초기화 세팅
		plangrand.setGrandplanIsdone(false);
		plangrand.setGrandplanIsmatch(false);
		plangrand.setGrandplanTtmplan(0);
		plangrand.setGrandplanTdmplan(0);

		// 이렇게 만들어진 plangrand를 save

		return pGS.save(plangrand);
	}

	// http://아이피/plangrands
	// 대플랜 수정 (put)
	@PutMapping("")
	public int updatePlanGrand(@RequestBody PlanUpdateDto updatedto) {
		//바꾸고자 하는 데이터를 불러온다
		return pGS.updateByDto(updatedto);
	}

	// http://아이피/plangrands/{대플랜시퀀스}
	// 대플랜 삭제 (delete)
	@DeleteMapping("/{seq}")
	public int deletePlanGrand(@PathVariable("seq") Long seq) {
		return pGS.deleteById(seq);
	}

}