package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    Optional<FollowEntity> findAllByFollower_UserSeqAndFollowing_UserSeq(Long followerSeq, Long followingSeq);

    // 유저별 팔로워 명수
    int countAllByFollowing_UserSeq(Long userSeq);

    // 유저별 팔로워 목록 조회
    @Query(value = "select * from followTb where followingSeq = :userSeq limit :limit offset :offset", nativeQuery = true)
    List<FollowEntity> findFollowerList(@Param(value = "userSeq") Long userSeq, @Param(value = "limit") int limit, @Param(value = "offset") int offset);

    // 유저별 팔로잉 명수
    int countAllByFollower_UserSeq(Long userSeq);

    // 유저별 팔로잉 목록 조회
    @Query(value = "select * from followTb where followerSeq = :userSeq limit :limit offset :offset", nativeQuery = true)
    List<FollowEntity> findFollowingList(@Param(value = "userSeq") Long userSeq, @Param(value = "limit") int limit, @Param(value = "offset") int offset);
}
