package com.ssafy.arthorizon.piece.Repository;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PieceRepository extends JpaRepository<PieceEntity,Long> {

    // 작품 전체 개수 조회
    int countAllBy();

    // 작품명으로 검색 개수 조회
    int countAllByPieceTitleKrContainsOrPieceTitleEnContains(String keyword1, String keyword2);

    // 작가명으로 검색 개수 조회
    int countAllByPieceArtistKrContainsOrPieceArtistEnContains(String keyword1, String keyword2);

    // 태그로 검색 개수 조회
    int countAllByPieceTagContainsOrPieceScentContains(String keyword1, String keyword2);

//    // 페이징 테스트
//    @Query(value="select * from pieceTb limit 10", nativeQuery = true)
//    List<PieceEntity> findList();

    // 작품 목록 최신순 조회
    @Query(value="select * from pieceTb order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
    List<PieceEntity> findRecentList(@Param(value="limit") int limit, @Param(value="offset") int offset);

    // 작품 목록 북마크순 조회
    @Query(value="select * from pieceTb order by pieceBookmarkCount desc limit :limit offset :offset", nativeQuery = true)
    List<PieceEntity> findPopularList(@Param(value="limit") int limit, @Param(value="offset") int offset);

    // 나의 작품 목록 조회
//    @Query(value="select * from pieceTb where pieceArtistSeq = :artistSeq order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<PieceEntity> findMyArtList(@Param(value="limit") int limit, @Param(value="offset") int offset,
//                                    @Param(value="artistSeq") Long artistSeq);

    List<PieceEntity> findPieceEntitiesByPieceArtist_UserSeq(Long seq);

    // 단일 작품 조회
    PieceEntity findByPieceSeq(Long pieceSeq);

    // 입력받은 향에 대해서 모든 작품을 뽑아오기
    List<PieceEntity> findPieceEntitiesByPieceScent(String scent);

    // 입력받은 종류인(명화인) 향에 대해서 모든 작품을 뽑아오기
    List<PieceEntity> findPieceEntitiesByPieceType(String type);

    // 작품명으로 검색
//    @Query(value="select * from pieceTb where pieceTitleKr LIKE %:keyword% or pieceTitleEn LIKE %:keyword% order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<PieceEntity> findByTitle(@Param(value="limit") int limit, @Param(value="offset") int offset,
//                                  @Param(value="keyword") String keyword);

    @Query(value="select * from pieceTb where pieceTitleKr LIKE %:keyword% or pieceTitleEn LIKE %:keyword% order by pieceSeq desc", nativeQuery = true)
    List<PieceEntity> findByTitle(@Param(value="keyword") String keyword);

    // 작가명으로 검색 (명화 한정)
//    @Query(value="select * from pieceTb where pieceArtistKr LIKE %:keyword% or pieceArtistEn LIKE %:keyword% order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<PieceEntity> findByPieceArtist(@Param(value="limit") int limit, @Param(value="offset") int offset,
//                                  @Param(value="keyword") String keyword);

    @Query(value="select * from pieceTb where pieceArtistKr LIKE %:keyword% or pieceArtistEn LIKE %:keyword% order by pieceSeq desc", nativeQuery = true)
    List<PieceEntity> findByPieceArtist(@Param(value="keyword") String keyword);

    // 태그 내용으로 검색
//    @Query(value="select * from pieceTb where pieceTag LIKE %:keyword% or pieceScent LIKE %:keyword% order by pieceSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<PieceEntity> findByTag(@Param(value="limit") int limit, @Param(value="offset") int offset,
//                                        @Param(value="keyword") String keyword);
    @Query(value="select * from pieceTb where pieceTag LIKE %:keyword% or pieceScent LIKE %:keyword% order by pieceSeq desc", nativeQuery = true)
    List<PieceEntity> findByTag(@Param(value="keyword") String keyword);

}
