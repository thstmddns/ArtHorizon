package com.ssafy.arthorizon.file;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/my-file")
public class FileController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
    private final String ORIGIN_PATH = "/home/ubuntu/Medici_data/images/";
//private final String ORIGIN_PATH = "C:/";

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

    // 파일 읽어주기
    @GetMapping("/read/{fileRoot}")
    public ResponseEntity<?> imageRead(@PathVariable String fileRoot){
        System.out.println("프로세스 시작");

        try {
            System.out.println("주소 가져오기");
            Path path = Paths.get(ORIGIN_PATH+fileRoot);
            System.out.println("주소 가져오기 성공");
//            String contentType = Files.probeContentType(path);;
            String contentType = "image/jpeg";
            System.out.println(path);


//            System.out.println("리소스 접근");
//            Resource resource = new InputStreamResource(Files.newInputStream(path));
//            System.out.println("리소스 접근 성공");
//            System.out.println(resource);

            System.out.println("파일 접근");
            File file = new File(String.valueOf(path));
            System.out.println("파일 접근 성공");
            System.out.println(file);

            System.out.println("헤더 작성");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileRoot, StandardCharsets.UTF_8).build());
            headers.add(HttpHeaders.CONTENT_TYPE, contentType);
            System.out.println("헤더 작성 성공");

            // 헤더가 없으면 조회만 되구
            // 헤더가 있으면 다운로드가? 된다?

            System.out.println("반환");
            return new ResponseEntity<>(file, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAILURE,HttpStatus.BAD_REQUEST);
        }
    }



}