package com.ssafy.arthorizon.file;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("file")
public class FileController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // 파일 입력 테스트
    @PostMapping("/user-art")
    public ResponseEntity<String> userArtFileUpload(@RequestHeader("jwt") String jwt, @RequestParam MultipartFile multipartFile) {

        if (multipartFile.isEmpty()) {
            return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
        } else {
            // 작가 정보랑
            // 작품 받아서 서비스로
            // 서비스에서 타입 입력 확인 후 리턴하면 다시 보내줌
            System.out.println(multipartFile.getOriginalFilename());
            String result = fileService.fileWrite(multipartFile, "user-art");
            if (result.equals("file save error")) {
                return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

        }
    }

    // 파일 입력 테스트
    @PostMapping("/profile")
    public ResponseEntity<String> profileFileUpload(@RequestHeader("jwt") String jwt, @RequestParam MultipartFile multipartFile) {

        if (multipartFile.isEmpty()) {
            return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
        } else {
            // 작가 정보랑
            // 작품 받아서 서비스로
            // 서비스에서 타입 입력 확인 후 리턴하면 다시 보내줌
            System.out.println(multipartFile.getOriginalFilename());
            String result = fileService.fileWrite(multipartFile, "profile");
            if (result.equals("file save error")) {
                return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

        }
    }
}