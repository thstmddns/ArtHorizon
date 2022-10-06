package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/users")
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

    @GetMapping("/followers/{pageUserSeq}")
    public ResponseEntity<FollowerPageDto> followerList(@RequestHeader("jwt") String jwt,
                                                        @PathVariable Long pageUserSeq,
                                                        @RequestParam(value = "page", defaultValue = "1") int page) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        FollowerPageDto res = userService.followerList(currentUserSeq, pageUserSeq, page);
        if (res.getResult() == FollowDto.FollowResult.NO_SUCH_USER) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/followings/{pageUserSeq}")
    public ResponseEntity<FollowingPageDto> followingList(@RequestHeader("jwt") String jwt,
                                                       @PathVariable Long pageUserSeq,
                                                       @RequestParam(value = "page", defaultValue = "1") int page) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        FollowingPageDto res = userService.followingList(currentUserSeq, pageUserSeq, page);
        if (res.getResult() == FollowDto.FollowResult.NO_SUCH_USER) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/bookmark/{pieceSeq}")
    public ResponseEntity<String> bookmarkPiece(@RequestHeader("jwt") String jwt, @PathVariable Long pieceSeq) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        BookmarkDto bookmarkDto = userService.bookmarkPiece(currentUserSeq, pieceSeq);
        if (bookmarkDto.getResult() == BookmarkDto.BookmarkResult.SUCCESS) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

    @DeleteMapping("/bookmark/{pieceSeq}")
    public ResponseEntity<String> unbookmarkPiece(@RequestHeader("jwt") String jwt, @PathVariable Long pieceSeq) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        BookmarkDto bookmarkDto = userService.unbookmarkPiece(currentUserSeq, pieceSeq);
        if (bookmarkDto.getResult() == BookmarkDto.BookmarkResult.SUCCESS) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        else { return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST); }
    }

    @GetMapping("/bookmark")
    public ResponseEntity<List<BookmarkListDto>> bookmarkList(@RequestHeader("jwt") String jwt) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        List<BookmarkListDto> bookmarkListDtos = userService.bookmarkList(currentUserSeq);
        return new ResponseEntity<>(bookmarkListDtos, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> userInfo(@RequestHeader("jwt") String jwt) {
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        UserInfoDto userInfo = userService.userInfo(currentUserSeq);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    // 로그인 안한 유저 (jwt X), 로그인한 유저 (jwt O)
    @GetMapping("/profile/{pageUserSeq}")
    public ResponseEntity<MypageDto> myPage(@RequestHeader("jwt") String jwt, @PathVariable Long pageUserSeq) {
        if (jwt.isEmpty()) {
            MypageDto res = userService.myPage(pageUserSeq);
            if (res.getResult() == SignupDto.SignupResult.SUCCESS) {
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
            else { return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST); }
        }
        else {
            Long currentUserSeq = jwtService.getUserSeq(jwt);
            MypageDto res = userService.myPageJwt(currentUserSeq, pageUserSeq);
            if (res.getResult() == SignupDto.SignupResult.SUCCESS) {
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
            else { return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST); }
        }
    }

    // 여기서부터 박자연
    // 프로필 사진 수정
    @PutMapping("/profile-img")
    public ResponseEntity<String> userProfileImg(@RequestHeader("jwt") String jwt, @RequestBody Map<String, String> imgData){
        // 존재하는 유저가 맞는지는 테스트하지 않았음
        Long currentUserSeq = jwtService.getUserSeq(jwt);
        String img = imgData.get("userImg");
        if(userService.userProfileImgService(currentUserSeq, img).equals("success")){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
        }

    }

    // 닉네임 중복 확인
    @GetMapping("/check")
    public ResponseEntity<String> checkNickname(@RequestParam(value = "nickname") String nickname){
        if(userService.checkNicknameService(nickname).equals("success")){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAILURE, HttpStatus.OK);
        }
    }

    // 랜덤 작가 세 명 조회
    @GetMapping("/artist")
    public ResponseEntity<List<ArtistDto>> randomArtist() {
        List<ArtistDto> artistDtos = userService.randomArtistService();
        return new ResponseEntity<>(artistDtos, HttpStatus.OK);
    }


}
