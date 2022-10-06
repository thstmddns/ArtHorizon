package com.ssafy.arthorizon.userArt;

import com.ssafy.arthorizon.piece.Entity.CollectEntity;
import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.CollectRepository;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserArtService {

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectRepository collectRepository;

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
        UserEntity userEntity = userRepository.findByUserSeq(artistSeq);
        pieceEntity.setPieceArtist(userEntity);

            try{
                // 작품 등록을 마치면
                pieceRepository.saveAndFlush(pieceEntity);

                // 작가의 작품 개수를 +1
                userEntity.setUserArtCount(userEntity.getUserArtCount()+1);
                userRepository.saveAndFlush(userEntity);

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
            // 작품을 삭제했으면
            pieceRepository.deleteById(userArtSeq);

            // 유저 찾기
            UserEntity userEntity = pieceRepository.findByPieceSeq(userArtSeq).getPieceArtist();

            // 작가의 작품 개수를 -1
            userEntity.setUserArtCount(userEntity.getUserArtCount()-1);
            userRepository.saveAndFlush(userEntity);

        } catch (Exception e){
            return "fail";
        }

        return "success";
    }

    // 유저 아트 판매
    public String userArtCollectService(Long userSeq, Long pieceSeq) {

        // 입력받은 것으로 엔티티를 만들어서 구매시킴
        CollectEntity collectEntity = new CollectEntity();
        collectEntity.setCollector(userRepository.findByUserSeq(userSeq));
        collectEntity.setCollecting(pieceRepository.findByPieceSeq(pieceSeq));

        try {
            collectRepository.saveAndFlush(collectEntity);
            return "success";
        } catch (Exception e) {
            return "save error";
        }

    }


    // 나의 유저 아트 보기
    public List<PieceListDto> myUserArtService(Long artistSeq) {

        // 작가가 맞는지 우선 확인
        UserEntity user = userRepository.findByUserSeq(artistSeq);
        if(user.getUserType()=='A') {
            // 맞을 시에 작품목록 db에서 싹 조회해줌
            List<PieceEntity> pieceEntityList = pieceRepository.findPieceEntitiesByPieceArtist_UserSeq(artistSeq);

            // 작품이 없는 작가일 수도 있으니까 비어있는 것은 오류로 잡아내지 않음

            List<PieceListDto> pieceListDtos = new ArrayList<>();

            for(PieceEntity piece:pieceEntityList){
                // 엔티티-->리스트dto변환
                pieceListDtos.add(new PieceListDto(piece));
            }

            return pieceListDtos;

        } else {
            // 작가가 아니라서 실패
            return null;
        }

    }

    public List<PieceListDto> myCollectArtService(Long userSeq) {

        List<CollectEntity> collectEntities = collectRepository.findCollectEntityByCollector_UserSeq(userSeq);
        List<PieceListDto> pieceListDtos = new ArrayList<>();

        for(CollectEntity collectEntity : collectEntities) {
            pieceListDtos.add(new PieceListDto(collectEntity.getCollecting()));
        }

        return pieceListDtos;

    }
}
