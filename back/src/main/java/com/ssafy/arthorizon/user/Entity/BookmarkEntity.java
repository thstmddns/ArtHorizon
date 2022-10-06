package com.ssafy.arthorizon.user.Entity;

import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name = "bookmarkTb")
@Data
public class BookmarkEntity {
    // pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long bookmarkSeq;

    @ManyToOne
    @JoinColumn(name="bookmarkerSeq", referencedColumnName = "userSeq")
    private UserEntity bookmarker;

    @ManyToOne
    @JoinColumn(name = "bookmarkingSeq", referencedColumnName = "pieceSeq")
    private PieceEntity bookmarking;
}
