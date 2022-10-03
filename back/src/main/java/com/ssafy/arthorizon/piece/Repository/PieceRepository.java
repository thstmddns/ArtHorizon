package com.ssafy.arthorizon.piece.Repository;

import com.ssafy.arthorizon.piece.PieceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PieceRepository extends JpaRepository<PieceEntity,Long> {

    // 작품 전체 개수 조회
    int countAllBy();

    // 작품 목록 최신순 조회
    @Query(value="select * from pieceTb order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
    List<PieceEntity> findRecentList(@Param(value="limit") int limit, @Param(value="offset") int offset);


    // 작품 목록 북마크순 조회
    @Query(value="select * from pieceTb order by pieceBookmarkCount desc limit :limit offset :offset", nativeQuery = true)
    List<PieceEntity> findPopularList(@Param(value="limit") int limit, @Param(value="offset") int offset);

    // 단일 작품 조회
    PieceEntity findByPieceSeq(Long pieceSeq);

    // 태그 검색

    // 페이징 테스트
    @Query(value="select * from pieceTb limit 10", nativeQuery = true)
    List<PieceEntity> findList();

    // 입력받은 향에 대해서 모든 작품을 뽑아오기
    List<PieceEntity> findPieceEntitiesByPieceScent(String scent);

}
