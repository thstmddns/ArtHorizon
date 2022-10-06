package com.ssafy.arthorizon.service.Repository;

import com.ssafy.arthorizon.service.Entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    Optional<ReportEntity> findByReporter_UserSeqAndReporting_UserSeq(Long reporterSeq, Long reportingSeq);

}
