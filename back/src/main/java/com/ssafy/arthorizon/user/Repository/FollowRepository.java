package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    Optional<FollowEntity> findAllByFollower_UserSeqAndFollowing_UserSeq(Long followerSeq, Long followingSeq);

//    @Query(value = "select * from followTb where followingSeq=?5", nativeQuery = true)
//    Page<FollowEntity> findAllByFollowing_UserSeq(Long followingSeq, Pageable pageable);
}
