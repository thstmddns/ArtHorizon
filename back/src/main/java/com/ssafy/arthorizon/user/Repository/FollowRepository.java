package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    Optional<FollowEntity> findByFollowerSeqAndFollowingSeq(Long followerSeq, Long followingSeq);
}
