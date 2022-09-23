package com.ssafy.arthorizon.piece;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import com.ssafy.arthorizon.user.UserEntity;

import javax.persistence.*;

@Entity
@DynamicUpdate
@Table(name="pieceTb")
@Data
public class PieceEntity {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long pieceSeq;

    @Column
    private String pieceType;

    @Column
    private String pieceTitleKr;

    @Column
    private String pieceTitleEn;

    @Column
    private String pieceArtistKr;

    @Column
    private String pieceArtistEn;

    @ManyToOne
    @JoinColumn(name="pieceArtistSeq", referencedColumnName = "userSeq")
    private UserEntity pieceArtist;

    @Column
    private String pieceDesc;

    @Column
    private String pieceImg;

    @Column
    private int pieceHitCount;

    @Column
    private int pieceBookmarkCount;

    @Column
    private String pieceTag;

    @Column
    private Integer pieceYear;

    @Column
    private int pieceCentury;

    @Column
    private String pieceStyle;

    @Column
    private String pieceGenre;

    @Column
    private String pieceScent;



}
