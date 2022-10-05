package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface BookmarkRepository extends JpaRepository<BookmarkEntity, Long> {

    // 유저별 북마크 개수
//    int countAllByBookmarker_UserSeq(Long bookmarkerSeq);

    Optional<BookmarkEntity> findAllByBookmarker_UserSeqAndBookmarking_PieceSeq(Long bookmarkerSeq, Long pieceSeq);

    // 유저별 북마크 목록 조회
//    @Query(value = "select * from bookmarkTb where bookmarkerSeq = :userSeq order by bookmarkSeq desc limit :limit offset :offset", nativeQuery = true)
//    List<BookmarkEntity> findBookmarkList(@Param(value = "userSeq") Long userSeq, @Param(value = "limit") int limit, @Param(value = "offset") int offset);

    List<BookmarkEntity> findBookmarkEntitiesByBookmarker_UserSeq(Long bookmarkerSeq);

}
