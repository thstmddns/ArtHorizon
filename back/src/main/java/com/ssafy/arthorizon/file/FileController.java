package com.ssafy.arthorizon.file;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/my-file")
public class FileController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
    private final String ORIGIN_PATH = "/home/ubuntu/S07P22D201/back/docker-volume/images/";
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

//    // 파일 읽어주기
    @GetMapping("/read/{fileRoot}")
    public ResponseEntity<?> imageRead(@PathVariable String fileRoot) throws IOException {
        System.out.println("프로세스 시작");

        System.out.println("파일인풋스트림 생성");
        System.out.println("목표 주소 : "+ORIGIN_PATH+fileRoot);
        InputStream inputStream = new FileInputStream(ORIGIN_PATH + fileRoot);
        System.out.println("파일인풋스트림 생성 성공, IOUtils 접근");
        System.out.println("파일 접근");
        File file = new File(ORIGIN_PATH+fileRoot);
        System.out.println("파일 접근 성공");
        System.out.println(file);
        Path path = Paths.get(ORIGIN_PATH+fileRoot);
//        byte[] content = Files.readAllBytes(path);
        byte[] imageByteArray = IOUtils.toByteArray(inputStream);
        System.out.println("toByteArray성공");
        inputStream.close();
//
//        try {
////            System.out.println("주소 가져오기");
////            Path path = Paths.get(ORIGIN_PATH+fileRoot);
////            System.out.println("주소 가져오기 성공");
//////            String contentType = Files.probeContentType(path);
////            String contentType = "image/jpeg";
////            System.out.println(path);
////
//////            System.out.println("리소스 접근");
//////            Resource resource = new InputStreamResource(Files.newInputStream(path));
//////            System.out.println("리소스 접근 성공");
//////            System.out.println(resource);
////
////            System.out.println("파일 접근");
////            File file = new File(String.valueOf(path));
////            System.out.println("파일 접근 성공");
////            System.out.println(file);
//
//
//
////            System.out.println("바이트 단위로 리딩");
////            byte[] content = Files.readAllBytes(path);
////            System.out.println(content);
//
////            System.out.println("이미지를 출력 (방법1)");
////            ByteArrayInputStream bis = new ByteArrayInputStream(content);
////            BufferedImage bufferedImage = ImageIO.read(bis);
////            System.out.println(bufferedImage);
////
////            System.out.println("이미지를 출력 (방법2)");
////            byte[] byteEnc64 = Base64.encodeBase64(content);
////            String imgStr = new String(byteEnc64, "UTF-8");
////            System.out.println(imgStr);
//
////            System.out.println("헤더 작성");
////            HttpHeaders headers = new HttpHeaders();
////            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileRoot, StandardCharsets.UTF_8).build());
////            headers.add(HttpHeaders.CONTENT_TYPE, contentType);
////            System.out.println("헤더 작성 성공");
//
//            // 헤더가 없으면 조회만 되구
//            // 헤더가 있으면 다운로드가? 된다?
//
//            System.out.println("반환");
            return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
////            return new ResponseEntity<>(file, headers, HttpStatus.OK);
////            return new ResponseEntity<>(content, headers, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(FAILURE,HttpStatus.BAD_REQUEST);
//        }
    }



}