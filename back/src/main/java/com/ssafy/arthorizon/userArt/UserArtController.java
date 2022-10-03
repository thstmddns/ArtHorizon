package com.ssafy.arthorizon.userArt;

import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.arthorizon.user.JwtService;

@RestController
@RequestMapping("/api/user-art")
public class UserArtController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
    private final UserArtService userArtService;
    private final JwtService jwtService;

    public UserArtController(UserArtService userArtService, JwtService jwtService) {
        this.userArtService = userArtService;
        this.jwtService = jwtService;
    }



    // 유저 아트 등록
    @PostMapping("")
    public ResponseEntity<String> userArtUpload(@RequestHeader("jwt") String jwt, @RequestBody UserArtDto userArtDto){

        if(jwt.isEmpty()){
            //jwt가 비어있으면 실패 처리
            return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
        } else {
            Long artistSeq = jwtService.getUserSeq(jwt);
            String result = userArtService.userArtUploadService(userArtDto, artistSeq);
            if(result.equals("success")){
                return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
            }
        }
    }

    // 유저 아트 수정
    @PutMapping("/{userArtSeq}")
    public ResponseEntity<String> userArtUpUpdate(@RequestHeader("jwt") String jwt, @PathVariable Long userArtSeq, @RequestBody UserArtDto userArtDto){

        if(jwt.isEmpty()){
            //jwt가 비어있으면 실패 처리
            return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
        } else {
            Long artistSeq = jwtService.getUserSeq(jwt);
            if(userArtService.userArtCheck(artistSeq,userArtSeq).equals("success")){
                String result = userArtService.userArtUpdateService(userArtDto, artistSeq, userArtSeq);
                // 수정하려는 사람과 작품의 저자가 같은지 확인하기
                if(result.equals("success")){
                    return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
                }
            }
            else {
                return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
            }
        }
    }

    // 유저 아트 삭제
    @DeleteMapping("/{userArtSeq}")
    public ResponseEntity<String> userArtDelete(@RequestHeader("jwt") String jwt, @PathVariable Long userArtSeq){
        if(jwt.isEmpty()){
            //jwt가 비어있으면 실패 처리
            return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
        } else {
            Long artistSeq = jwtService.getUserSeq(jwt);
            // 수정하려는 사람과 작품의 저자가 같은지 확인하기
            if(userArtService.userArtCheck(artistSeq,userArtSeq).equals("success")){
                String result = userArtService.userArtDeleteService(userArtSeq);
                if(result.equals("success")){
                    return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
                }
            }
            else {
                return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
            }
        }
    }

    // 유저 아트 판매

    // 나의 유저아트 모아보기
    @GetMapping("")
    public ResponseEntity<PiecePageDto> myUserArt(@RequestHeader("jwt") String jwt, @RequestParam("page") int page) {

        // jwt가 비었을 경우에는 알아서 인터셉터가 잡아줄테니까

        // 존재하는 유저인지 확인
        Long artistSeq = jwtService.getUserSeq(jwt);
        if(artistSeq==null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } else {
            PiecePageDto result = userArtService.myUserArtService(artistSeq, page);
            if(result.getResult()== PieceDto.PieceResult.SUCCESS){
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }

    }

}
