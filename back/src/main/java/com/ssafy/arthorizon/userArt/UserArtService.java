package com.ssafy.arthorizon.userArt;

import com.ssafy.arthorizon.file.FileService;
import com.ssafy.arthorizon.piece.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserArtService {

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

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

        // 이미 이미지를 저장해서 루트로 반환했음

        // 입력받은걸로 pieceEntity를 채운다
        PieceEntity pieceEntity = new PieceEntity(userArtDto);

        // 유저는 직접 채워줘야함
        pieceEntity.setPieceArtist(userRepository.findByUserSeq(artistSeq));

            try{
                pieceRepository.saveAndFlush(pieceEntity);
            } catch (Exception e){
                return "fail";
            }
            return "success";

    }

    // 유저 아트 수정
    public String userArtUpdateService(UserArtDto userArtDto, Long artistSeq, Long userArtSeq) {

        // 입력받은걸로 pieceEntity를 채운다
        PieceEntity pieceEntity = new PieceEntity(userArtDto);

        // 유저는 직접 채워줘야함
        pieceEntity.setPieceArtist(userRepository.findByUserSeq(artistSeq));

            try{
                // 새로 쓰는게 아니라 수정하는거니까 입력받은 유저아트 시퀀스를 입력해준다
                pieceEntity.setPieceSeq(userArtSeq);
                pieceRepository.saveAndFlush(pieceEntity);
            } catch (Exception e){
                return "fail";
            }
        return "success";
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
