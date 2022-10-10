package com.ssafy.arthorizon.file;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Date;

@Service
public class FileService {

//    private final String ROOT_PROFILE = "profiles/";
//    private final String ROOT_USERART = "userArts/";
    private final String ORIGIN_PATH = "/home/ubuntu/S07P22D201/back/docker-volume/images/";

//    private final String ROOT_PROFILE = "C:/";
//    private final String ROOT_USERART = "C:/";

    // 파일 쓰기
    // 파일 이름을 보내주면 경로를 알아서 치겠습니다
    // 경로를 반환해야 한다
    public String fileWrite(MultipartFile multipartFile, String fileType){

        System.out.println("파일명 : " + multipartFile.getOriginalFilename());
        System.out.println("파일크기 : " + multipartFile.getSize());

        try{
            String fileName;
            String filePath;
            long now = new Date().getTime();

            if(fileType.equals("profile")){
                fileName = "profile_" + now + ".jpg";
                filePath = ORIGIN_PATH + fileName;
            } else{
                fileName = "userArts_" + now + ".jpg";
                filePath = ORIGIN_PATH + fileName;
            }

            // 밖으로 내보낼 아웃풋스트림을 만들고
            FileOutputStream fileOutputStream = new FileOutputStream(filePath);
            // 입력받은 파일을 하나씩 읽을 인풋스트림을 만들고
            InputStream inputStream = multipartFile.getInputStream();

            // 읽어들인 글자의 수
            int readCount = 0;
            // 한번에 읽을 만큼의 바이트를 지정한다
            // 1024, 2048, 4096 등의 형태로 설정하는 것이 일반적임임
            byte[] buffer = new byte[1024];

            while ((readCount=inputStream.read(buffer))!=-1){
                // inputStream에서 버퍼만큼 읽어들인 것이 -1이 아닌 한 반복한다
                fileOutputStream.write(buffer,0,readCount);
            }

            // 다 쓴 인풋스트림은 꼭 닫아주자!
            // 파이널리로 닫고 싶었는데ㅠㅠ
            inputStream.close();
            fileOutputStream.close();
            System.out.println(filePath+" 저장완료");
            return fileName;

        } catch(Exception e) {
            // 여기서도 닫아야 할 것 같은데...
            return "file save error";
        }

    }

}
