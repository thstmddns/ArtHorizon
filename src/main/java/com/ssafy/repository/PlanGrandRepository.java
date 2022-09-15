package com.ssafy.repository;

import com.ssafy.entity.PlanGrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanGrandRepository extends JpaRepository<PlanGrand, Long>{

	List<PlanGrand> findByUser_UserUid(String uid);

	PlanGrand findByGrandplanSeq(Long temp);

	List<PlanGrand> findByUser_UserUidAndGrandplanIsmatchFalseAndGrandplanIsdoneFalse(String uid);

}
