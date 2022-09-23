package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.user.dto.SignupDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
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

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginPost(@RequestBody Map<String, String> req) {
        SignupDto signupDto = userService.login(req);
        if (signupDto.getResult() == SignupDto.SignupResult.FAILURE) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
        String jwt = jwtService.create(signupDto.getUserSeq(), signupDto.getUserEmail());
        Map<String, Object> res = new HashMap<>();
        res.put("jwt", jwt);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/change")
    public ResponseEntity<String> typeChange(@RequestHeader("jwt") String jwt) {
        // jwt에서 userSeq 가져와서 그 유저 타입 전환
        Long userSeq = jwtService.getUserSeq(jwt);
        // 해당 유저가 없는 경우
        if (userSeq == null) { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
        if (userService.typeChange(userSeq)) { return new ResponseEntity<>(SUCCESS, HttpStatus.OK); }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

    @DeleteMapping("/quit")
    public ResponseEntity<String> quitUser(@RequestHeader("jwt") String jwt) {
        Long userSeq = jwtService.getUserSeq(jwt);
        // 해당 유저가 없는 경우
        if (userSeq == null) { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
        userService.quitUser(userSeq);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @PutMapping("/change-profile")
    public ResponseEntity<String> profileChange(@RequestHeader("jwt") String jwt, @RequestBody Map<String, String> req) {
        Long userSeq = jwtService.getUserSeq(jwt);
        userService.profileChange(userSeq, req);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @PutMapping("/password")
    public ResponseEntity<String> passwordChange(@RequestHeader("jwt") String jwt, @RequestBody Map<String, String> req) {
        Long userSeq = jwtService.getUserSeq(jwt);
        if (userService.passwordChange(userSeq, req)) { return new ResponseEntity<>(SUCCESS, HttpStatus.OK); }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

    @PostMapping("/follow/{followUserSeq}")
    public ResponseEntity<String> followUser(@RequestHeader("jwt") String jwt, @PathVariable Long followUserSeq) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        if (userService.followUser(currentUserSeq, followUserSeq)) { return new ResponseEntity<>(SUCCESS, HttpStatus.OK); }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

    @DeleteMapping("/follow/{followUserSeq}")
    public ResponseEntity<String> unfollowUser(@RequestHeader("jwt") String jwt, @PathVariable Long followUserSeq) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        if (userService.unfollowUser(currentUserSeq, followUserSeq)) { return new ResponseEntity<>(SUCCESS, HttpStatus.OK); }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

//    @GetMapping("/followers/{pageUserSeq}") //@RequestParam(defaultValue = "1") int page
//    public ResponseEntity<Map<String, Object>> followerList(@RequestHeader("jwt") String jwt, @PathVariable Long pageUserSeq, Pageable pageable) {
//        Long currentUserSeq = jwtService.getUserSeq(jwt);
//        Map<String, Object> res = userService.followerList(currentUserSeq, pageUserSeq, pageable);
//        if (res.isEmpty()) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
//        return new ResponseEntity<>(res, HttpStatus.OK);
//    }





}
