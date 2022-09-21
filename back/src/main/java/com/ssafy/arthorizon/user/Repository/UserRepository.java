package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserEmail(String userEmail);
//    @Query("select u.userSeq, u.userEmail, u.userPassword, u.userNickname from UserEntity u where u.userEmail=")
//    SignupDto findByUserEmail(String userEmail);

    UserEntity findByUserSeq(Long userSeq);





}
