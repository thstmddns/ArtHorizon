package com.ssafy.arthorizon.service.Repository;

import com.ssafy.arthorizon.service.Entity.NoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity,Long> {
}
