package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.user.dto.SignupDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserEmail(String userEmail);
//    @Query("select u.userSeq, u.userEmail, u.userPassword, u.userNickname from UserEntity u where u.userEmail=")
//    SignupDto findByUserEmail(String userEmail);

    String findUserEmailByUserSeq(Long userSeq);



}
