package com.ssafy.arthorizon.game;

import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.piece.dto.PieceListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GameService {

    @Autowired
    private PieceRepository pieceRepository;

    public List<PieceListDto> gameWorldCupListService() {

        // 중복제거를 위해 set 형태로 고안
        Set<PieceListDto> pieceSet = new HashSet<>();
        // 랜덤 추출을 위한 총 개수 생성
        int lowCount = pieceRepository.countAllBy();

        while(pieceSet.size()<20){
            int randomIndex = (int) (Math.random()*(lowCount)+1);
            PieceListDto piece = new PieceListDto(pieceRepository.findByPieceSeq((long) randomIndex));
            if(piece!=null){
                pieceSet.add(piece);
            }
        }

        List<PieceListDto> pieceListDtos = new ArrayList<>(pieceSet);
        return pieceListDtos;
    }
}
