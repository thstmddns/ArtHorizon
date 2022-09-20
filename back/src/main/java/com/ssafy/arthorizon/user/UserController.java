package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.user.dto.SignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
//    @Autowired
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signupPost(@RequestBody Map<String, String> req) {
        SignupDto signupDto = userService.signup(req);
        if (signupDto.getResult() == SignupDto.SignupResult.FAILURE) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
        String jwt = jwtService.create(signupDto.getUserSeq(), signupDto.getUserEmail());
        Map<String, Object> res = new HashMap<>();
        res.put("jwt", jwt);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }



}
