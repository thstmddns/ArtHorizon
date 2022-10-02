package com.ssafy.arthorizon.piece.Repository;

import com.ssafy.arthorizon.piece.PieceEntity;
import com.ssafy.arthorizon.piece.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<TagEntity,Long> {

}
