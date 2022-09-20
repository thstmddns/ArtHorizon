package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.common.CryptoUtil;
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

}
