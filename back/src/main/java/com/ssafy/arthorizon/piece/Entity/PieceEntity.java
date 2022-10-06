package com.ssafy.arthorizon.piece.Entity;

import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.userArt.dto.UserArtDto;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

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

    @Column
    private int piecePrice;

    public PieceEntity() {}

    public PieceEntity(UserArtDto userArtDto){
        this.pieceType = "A";
        this.pieceTitleKr = userArtDto.getPieceTitleKr();
        this.pieceTitleEn = userArtDto.getPieceTitleEn();
        this.pieceDesc = userArtDto.getPieceDesc();
        this.pieceImg = userArtDto.getPieceImg();
        this.pieceHitCount = 0;
        this.pieceBookmarkCount = 0;
        this.pieceTag = userArtDto.getPieceTag();
        this.pieceYear = LocalDate.now().getYear();
        this.pieceCentury = (int) Math.floor(this.pieceYear/100)+1;
        this.pieceScent = userArtDto.getPieceScent();
        this.piecePrice = userArtDto.getPiecePrice();
    }



}
