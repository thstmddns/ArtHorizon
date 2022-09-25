package com.ssafy.arthorizon.userArt;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.ssafy.arthorizon.piece.PieceEntity;
import com.ssafy.arthorizon.piece.PieceRepository;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import jdk.internal.util.xml.impl.Input;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;

@Service
public class UserArtService {

    private final int FILE_MAX_UPLOAD_SIZE = 10485760; // 1024 * 1024 * 10
    private final String SAVE_ROOT = "/home/ubuntu/Medici_data/images/";

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private UserRepository userRepository;

    // 파일 쓰기
    // 인덱스+닉네임+작품명이 일치하므로 덮어쓰기 처리된다
    public String userArtWrite(MultipartFile multipartFile, String fileName){

        System.out.println("파일명 : " + multipartFile.getOriginalFilename());
        System.out.println("파일크기 : " + multipartFile.getSize());

        try{
            // 밖으로 내보낼 아웃풋스트림을 만들고
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
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
        } catch(Exception e) {
            // 여기서도 닫아야 할 것 같은데...
            return "file save error";
        }
        return "success";
    }

    // jwt가 가진 유저 정보와 수정하려는 작품이 가진 정보가 같은지 확인하는 서비스
    public String userArtCheck(Long artistSeq, Long userArtSeq){
        Long userSeq = pieceRepository.findById(userArtSeq).get().getPieceArtist().getUserSeq();
        if(artistSeq==userSeq){
            return "success";
        } else {
            return "user-wrong";
        }
    }

    // 유저 아트 등록
    public String userArtUploadService(UserArtDto userArtDto, Long artistSeq){

        // 입력받은걸로 pieceEntity를 채운다
        PieceEntity pieceEntity = new PieceEntity(userArtDto);

        // 유저는 직접 채워줘야함
        // 유저 닉이 필요해서 이미지도 직접 채워준다
        pieceEntity.setPieceArtist(userRepository.findByUserSeq(artistSeq));
        pieceEntity.setPieceImg(SAVE_ROOT
                +pieceEntity.getPieceSeq()
                +"_"+pieceEntity.getPieceArtist().getUserNickname()
                +"_"+pieceEntity.getPieceTitleKr()
                +".jpg");

        // 입력받은 이미지를 멀티파트파일로 읽는다...
        // 쓴다...
        // 다썼다...
        String result = userArtWrite(userArtDto.getPieceImg(), pieceEntity.getPieceImg());

        if(result.equals("success")){
            try{
                pieceRepository.saveAndFlush(pieceEntity);
            } catch (Exception e){
                return "fail";
            }
            return result;
        } else {
            return result;
        }
    }

    // 유저 아트 수정
    public String userArtUpdateService(UserArtDto userArtDto, Long artistSeq, Long userArtSeq) {

        // 입력받은걸로 pieceEntity를 채운다
        PieceEntity pieceEntity = new PieceEntity(userArtDto);

        // 유저는 직접 채워줘야함
        pieceEntity.setPieceArtist(userRepository.findByUserSeq(artistSeq));
        // 오리지널 파일명을 그대로 쓰자
        pieceEntity.setPieceImg(userArtDto.getPieceImg().getOriginalFilename());

        // 입력받은 이미지를 멀티파트파일로 읽는다...
        // 쓴다...
        // 다썼다...
        String result = userArtWrite(userArtDto.getPieceImg(), pieceEntity.getPieceImg());

        if(result.equals("success")){
            try{
                // 새로 쓰는게 아니라 수정하는거니까 입력받은 유저아트 시퀀스를 입력해준다
                pieceEntity.setPieceSeq(userArtSeq);
                pieceRepository.saveAndFlush(pieceEntity);
            } catch (Exception e){
                return "fail";
            }
        }
        return result;
    }

    // 유저 아트 삭제
    public String userArtDeleteService(Long userArtSeq) {

        try{
            pieceRepository.deleteById(userArtSeq);
        } catch (Exception e){
            return "fail";
        }

        return "success";
    }

    // 유저 아트 판매

}
