package com.ssafy.arthorizon.user.Repository;

import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface BookmarkRepository extends JpaRepository<BookmarkEntity, Long> {

    Optional<BookmarkEntity> findAllByBookmarker_UserSeqAndBookmarking_PieceSeq(Long bookmarkerSeq, Long pieceSeq);
}
