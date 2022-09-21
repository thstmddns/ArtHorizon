package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.common.CryptoUtil;
import com.ssafy.arthorizon.user.Entity.FollowEntity;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.Repository.FollowRepository;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.user.dto.SignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowRepository followRepository;

    public SignupDto signup(Map<String, String> req) {
        // 가입하려는 유저가 DB에 있는지 email(id)로 확인. 없으면 가입 과정 수행
        UserEntity user = userRepository.findByUserEmail(req.get("userEmail"));
        SignupDto signupDto = new SignupDto();
        if(user == null) {
            UserEntity userEntity = new UserEntity();
            Date today = new Date();
            // Entity에 넣어서 Repository에 저장
            userEntity.setUserEmail(req.get("userEmail"));
            userEntity.setUserNickname(req.get("userNickname"));
            userEntity.setUserPassword(CryptoUtil.Sha512.hash(req.get("userPassword")));
            userEntity.setUserType(req.get("userType"));
            userEntity.setUserSignAt(today);
            userRepository.save(userEntity);
            // 저장 후 jwt 발급을 위해 다시 불러옴(userSeq 사용하기 위해)
            UserEntity currentUser = userRepository.findByUserEmail(userEntity.getUserEmail());
            // SignupDto에 필요한 값만 세팅해주기
            signupDto.setUserEmail(currentUser.getUserEmail());
            signupDto.setUserPassword(currentUser.getUserPassword());
            signupDto.setUserSeq(currentUser.getUserSeq());
            signupDto.setResult(SignupDto.SignupResult.SUCCESS);
            return signupDto;
        }
        signupDto.setResult(SignupDto.SignupResult.FAILURE);
        return signupDto;
    }

    public SignupDto login(Map<String, String> req) {
        SignupDto signupDto = new SignupDto();
        // 해당 email(id) 있는지 확인 -> 있으면 그 사용자 password 사용해서 확인하기
        UserEntity user = userRepository.findByUserEmail(req.get("userEmail"));
        if (user == null) {
            signupDto.setResult(SignupDto.SignupResult.FAILURE);
            return signupDto;
        }
        if (Objects.equals(CryptoUtil.Sha512.hash(req.get("userPassword")), user.getUserPassword())) {
            signupDto.setUserEmail(user.getUserEmail());
            signupDto.setUserSeq(user.getUserSeq());
            signupDto.setResult(SignupDto.SignupResult.SUCCESS);
            return signupDto;
        }
        signupDto.setResult(SignupDto.SignupResult.FAILURE);
        return signupDto;
    }

    public boolean typeChange(Long userSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        String type = user.getUserType();
        // 해당 유저가 이미 화가 회원이면 False
        if (Objects.equals(type, "A")) { return false; }
        // 해당 유저가 일반 회원이면 타입 변환해주고 True
        if (Objects.equals(type, "N")) {
            user.setUserType("A");
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean quitUser(Long userSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        userRepository.delete(user);
        return true;
    }

    public void profileChange(Long userSeq, Map<String, String> req) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        user.setUserNickname(req.get("userNickname"));
        user.setUserDesc(req.get("userDesc"));
        userRepository.save(user);
    }

    public boolean passwordChange(Long userSeq, Map<String ,String> req) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        if (!Objects.equals(user.getUserPassword(), CryptoUtil.Sha512.hash(req.get("userPassword")))) {
            return false;
        }
        user.setUserPassword(CryptoUtil.Sha512.hash(req.get("changeUserPassword")));
        userRepository.save(user);
        return true;
    }

    public boolean followUser(Long currentUserSeq, Long followUserSeq) {
        UserEntity followUser = userRepository.findByUserSeq(followUserSeq);
        if (followUser == null) { return false; }
        // 이미 팔로우하고 있으면 false 반환
        if (followRepository.findByFollowerSeqAndFollowingSeq(currentUserSeq, followUserSeq).isPresent()) {
            return false;
        }
        // follow tb에 추가
        FollowEntity followEntity = new FollowEntity();
        followEntity.setFollowerSeq(currentUserSeq);
        followEntity.setFollowingSeq(followUserSeq);
        followRepository.save(followEntity);
        // user tb에 각 followerCount + 1, followingCount + 1
        followUser.setUserFollowerCount(followUser.getUserFollowerCount() + 1);
        userRepository.save(followUser);
        UserEntity currentUser = userRepository.findByUserSeq(currentUserSeq);
        currentUser.setUserFollowingCount(followUser.getUserFollowingCount() + 1);
        userRepository.save(currentUser);
        return true;
    }


}
