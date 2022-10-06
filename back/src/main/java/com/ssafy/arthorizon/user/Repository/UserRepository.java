package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserEmail(String userEmail);

    UserEntity findByUserSeq(Long userSeq);

    Optional<UserEntity> findByUserNickname(String nickName);

    // 아티스트 회원 뽑아내기
    List<UserEntity> findUserEntitiesByUserType(char type);

    // 사용자 검색
//    @Query(value="select * from userTb where userNickname LIKE %:keyword% order by userSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<UserEntity> findByNickname(@Param(value="limit") int limit, @Param(value="offset") int offset,
//                                  @Param(value="keyword") String keyword);

    @Query(value="select * from userTb where userNickname LIKE %:keyword% order by userSeq desc", nativeQuery = true)
    List<UserEntity> findByNickname(@Param(value="keyword") String keyword);

    // 사용자 검색 개수 조회
    int countAllByUserNicknameContains(String keyword);

}
