package com.ssafy.arthorizon.piece.Repository;

import com.ssafy.arthorizon.piece.Entity.CollectEntity;
import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollectRepository extends JpaRepository<CollectEntity, Long> {

    Optional<CollectEntity> findCollectEntityByCollecting_PieceSeqAndAndCollector_UserSeq(Long pieceSeq, Long userSeq);

    List<CollectEntity> findCollectEntityByCollector_UserSeq(Long userSeq);
}
