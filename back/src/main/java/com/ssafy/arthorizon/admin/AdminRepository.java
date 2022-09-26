package com.ssafy.arthorizon.admin;

import com.ssafy.arthorizon.piece.PieceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
}
