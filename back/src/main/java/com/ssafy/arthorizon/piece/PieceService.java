package com.ssafy.arthorizon.piece;

import com.ssafy.arthorizon.piece.Entity.CollectEntity;
import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.CollectRepository;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.Repository.TagRepository;
import com.ssafy.arthorizon.piece.dto.PieceDto;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import com.ssafy.arthorizon.piece.dto.PiecePageDto;
import com.ssafy.arthorizon.piece.dto.TagDto;
import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import com.ssafy.arthorizon.user.Repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PieceService {

    @Autowired
    private PieceRepository pieceRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private CollectRepository collectRepository;

    private final int LIMIT = 8;

    // 작품 목록 최신순, 북마크순 조회
    public PiecePageDto pieceListService(int page, String type) {
        // limit는 고정

        // page를 통해 offset을 계산
        int offset = LIMIT*(page-1);

        List<PieceEntity> pieceEntity;

        // 해당하는 옵션대로 작품 목록을 뽑아옴
        if(type.equals("popular")){
            pieceEntity = pieceRepository.findPopularList(LIMIT,offset);
        } else {
            pieceEntity = pieceRepository.findRecentList(LIMIT,offset);
        }

        if(pieceEntity.isEmpty()){
            // 아까 조사해온게 비어있으면
            PiecePageDto piecePageDto = new PiecePageDto();
            piecePageDto.setResult(PieceDto.PieceResult.FAILURE);
            return piecePageDto;
        } else {
            // 제대로 되어있으면
            // 전체 작품 목록의 수를 뽑아옴
            int totalPage = (int) Math.ceil((pieceRepository.countAllBy())/LIMIT) +1;

            // 반환할 페이지 dto를 작성
            PiecePageDto piecePageDto = new PiecePageDto(totalPage, page, pieceEntity);

            // 반환 상태에 대해서 result 기록
            piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

            return piecePageDto;
        }

    }

    // 단일 작품 조회
    public PieceDto pieceOne(Long pieceSeq, Long userSeq) {
        PieceEntity pieceEntity = pieceRepository.findByPieceSeq(pieceSeq);

        if(pieceEntity==null){
            PieceDto pieceDto = new PieceDto();
            pieceDto.setResult(PieceDto.PieceResult.FAILURE);
            return pieceDto;
        } else {
            PieceDto pieceDto = new PieceDto(pieceEntity);
            pieceDto.setResult(PieceDto.PieceResult.SUCCESS);

            // 정상적으로 작품을 가져왔으므로, 북마크 검사
            if(userSeq == 0) {
                // 비로그인 상태의 유저라는 의미이므로 userBookmarkYn은 N으로 나간다
                pieceDto.setPieceBookmarkYn('N');
                pieceDto.setPieceCollectYn('N');
            } else {
                // 로그인 상태의 유저라는 의미이므로 북마크 되어있는지 검사한다
                Optional<BookmarkEntity> bookmarkEntityOptional =
                        bookmarkRepository.findAllByBookmarker_UserSeqAndBookmarking_PieceSeq(userSeq, pieceEntity.getPieceSeq());
                if(bookmarkEntityOptional.isPresent()) {
                    pieceDto.setPieceBookmarkYn('Y');
                } else {
                    pieceDto.setPieceBookmarkYn('N');
                }

                // 로그인 상태의 유저라는 의미이므로 구매되어 있는지 검사한다
                Optional<CollectEntity> collectEntity =
                        collectRepository.findCollectEntityByCollecting_PieceSeqAndAndCollector_UserSeq(pieceEntity.getPieceSeq(), userSeq);

                if(collectEntity.isPresent()) {
                    pieceDto.setPieceCollectYn('Y');
                } else {
                    pieceDto.setPieceCollectYn('N');
                }

            }

            return pieceDto;
        }

    }

    // 랜덤 작품 조회
    public PiecePageDto pieceListRandomService(int page) {

        // 중복제거를 위해 set 형태로 고안
        Set<PieceEntity> pieceSet = new HashSet<>();
        // 랜덤 추출을 위한 총 개수 생성
        int lowCount = pieceRepository.countAllBy();

        while(pieceSet.size()<20){
            int randomIndex = (int) (Math.random()*(lowCount)+1);
            PieceEntity piece = pieceRepository.findByPieceSeq((long) randomIndex);
            if(piece!=null){
                pieceSet.add(piece);
            }
        }

        List<PieceEntity> pieceLists = new ArrayList<>(pieceSet);

        PiecePageDto piecePageDto = new PiecePageDto(lowCount, page, pieceLists);
        piecePageDto.setResult(PieceDto.PieceResult.SUCCESS);

        return piecePageDto;


    }

    // 메인화면 태그 조회
    public List<TagDto> tagMainService() {

        // 중복제거를 위해 set 형태로 고안
        Set<TagDto> tagSet = new HashSet<>();
        // 랜덤 추출을 위한 총 개수 생성ㅣ[
        int lowCount = 15;

        while(tagSet.size()<8){
            int randomIndex = (int) (Math.random()*(lowCount)+1);
            TagDto tagDto = new TagDto(tagRepository.findById((long) randomIndex).get());
            if(tagDto!=null){
                tagSet.add(tagDto);
            }
        }

        List<TagDto> pieceLists = new ArrayList<>(tagSet);

        return pieceLists;

    }

    // 향으로 랜덤 세 개 뽑아주지
    public List<PieceListDto> pieceByScentService(String scent) {
        Set<PieceListDto> pieceSet = new HashSet<>();

        // 리스트로 받아오고
        List<PieceEntity> pieceEntityList = pieceRepository.findPieceEntitiesByPieceScent(scent);
        // 그 사이즈를 파악하고
        int size = pieceEntityList.size();

        while(pieceSet.size()<3) {
            // 사이즈 안에서 랜덤
            int randomIndex = (int) (Math.random()*(size));
            PieceEntity pieceEntity = pieceEntityList.get(randomIndex);
            PieceListDto pieceListDto = new PieceListDto(pieceEntity);
            pieceSet.add(pieceListDto);
        }

        List<PieceListDto> pieceLists = new ArrayList<>(pieceSet);

        return pieceLists;

    }

    // 메인 화면에 쓰알 하나의 작품 뽑기
    public PieceListDto pieceForMainService() {
        // 검사해서 뽑고 고르는 거랑 거랑 다 고르고 검사하는 것 중에 뭐가 더 나은 방법일까요
        // 지금은 다 뽑고 검사하는 중

        // 리스트로 받아오고
        List<PieceEntity> pieceEntityList = pieceRepository.findPieceEntitiesByPieceType("M");
        // 그 사이즈를 파악하고
        int size = pieceEntityList.size();

        int randomIndex = (int) (Math.random()*(size));
        PieceEntity pieceEntity = pieceEntityList.get(randomIndex);
        PieceListDto pieceListDto = new PieceListDto(pieceEntity);

        return pieceListDto;

    }
}
