package com.ssafy.arthorizon.service;

import com.ssafy.arthorizon.admin.AdminRepository;
import com.ssafy.arthorizon.service.Entity.ReportEntity;
import com.ssafy.arthorizon.service.Repository.ReportRepository;
import com.ssafy.arthorizon.service.Repository.ReportTypeRepository;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminReporisoty;

    @Autowired
    private ReportTypeRepository reportTypeRepository;

    // 유저 신고 등록하기
    public String userReport(Long reporterSeq, Map<String, Long> report){

        // 신고하는 사람 = reporterSeq

        // 신고되는 사람
        Long reportingSeq = report.get("reportingSeq");
        // 이 사람의 신고 타입
        Long reportTypeSeq = report.get("reportTypeSeq");

        System.out.println(reporterSeq);
        System.out.println(reportingSeq);

        // 신고 중복확인
        Optional<ReportEntity> reportEntityOptional = reportRepository.findByReporter_UserSeqAndReporting_UserSeq(reporterSeq, reportingSeq);
        if(reportEntityOptional.isPresent()){
            return "already done";
        } else {
            // 값 채워넣기
            ReportEntity reportEntity = new ReportEntity();
            reportEntity.setReporter(userRepository.findByUserSeq(reporterSeq));
            reportEntity.setReporting(userRepository.findByUserSeq(reportingSeq));
            reportEntity.setReportAdmin(adminReporisoty.findById(new Long(1)).get());
            reportEntity.setReportType(reportTypeRepository.findById(reportTypeSeq).get());
            reportEntity.setReportAt(new Date());
            reportEntity.setReportIsHandle("N");

            try {
                reportRepository.save(reportEntity);
            } catch (Exception e) {
                return "fail";
            }

        }

        return "success";
    }

}
