package com.ssafy.arthorizon.userArt;

import com.ssafy.arthorizon.file.FileService;
import com.ssafy.arthorizon.piece.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserArtService {

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private UserRepository userRepository;

    private final int LIMIT = 8;

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

    // 나의 유저 아트 보기
    public PiecePageDto myUserArtService(Long artistSeq, int page) {

        // 작가가 맞는지 우선 확인
        UserEntity user = userRepository.findByUserSeq(artistSeq);
        if(user.getUserType()=='A') {
            // 맞을 시에 작품목록 db에서 싹 조회해줌
            List<PieceEntity> pieceEntityList = pieceRepository.findMyArtList(LIMIT, page, artistSeq);

            // 작품이 없는 작가일 수도 있으니까 비어있는 것은 오류로 잡아내지 않음

            // 전체 작품 목록의 수를 뽑아옴
            int totalPage = (int) Math.ceil((pieceRepository.countAllByPieceArtist_UserSeq(artistSeq))/LIMIT);

            // 반환할 페이지 dto를 작성
            PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntityList);

            // 반환 상태에 대해서 result 기록
            piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

            return piecePageDto;

        } else {
            // 작가가 아니라서 실패
            PiecePageDto piecePageDto = new PiecePageDto();
            piecePageDto.setResult(PieceDto.PieceResult.FAILURE);
            return piecePageDto;
        }

    }

}