package com.ssafy.arthorizon.user;

import com.ssafy.arthorizon.common.CryptoUtil;
import com.ssafy.arthorizon.piece.Entity.PieceEntity;
import com.ssafy.arthorizon.piece.Repository.PieceRepository;
import com.ssafy.arthorizon.user.Entity.BookmarkEntity;
import com.ssafy.arthorizon.user.Entity.UserEntity;
import com.ssafy.arthorizon.user.Repository.BookmarkRepository;
import com.ssafy.arthorizon.user.Repository.UserRepository;
import com.ssafy.arthorizon.user.dto.*;
import com.ssafy.arthorizon.user.Entity.FollowEntity;
import com.ssafy.arthorizon.user.Repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private PieceRepository pieceRepository;

    private final int LIMIT = 8;

    public SignupDto signup(Map<String, String> req) {
        // 가입하려는 유저가 DB에 있는지 email(id)로 확인. 없으면 가입 과정 수행
        UserEntity user = userRepository.findByUserEmail(req.get("userEmail"));
        SignupDto signupDto = new SignupDto();
        if(user == null) {
            UserEntity userEntity = new UserEntity();
            Date today = new Date();
            // Entity에 넣어서 Repository에 저장
            userEntity.setUserEmail(req.get("userEmail"));
            userEntity.setUserNickname(req.get("userNickname"));
            userEntity.setUserPassword(CryptoUtil.Sha512.hash(req.get("userPassword")));
            userEntity.setUserType(req.get("userType").charAt(0));
            userEntity.setUserSignAt(today);
            userRepository.save(userEntity);
            // 저장 후 jwt 발급을 위해 다시 불러옴(userSeq 사용하기 위해)
            UserEntity currentUser = userRepository.findByUserEmail(userEntity.getUserEmail());
            // SignupDto에 필요한 값만 세팅해주기
            signupDto.setUserEmail(currentUser.getUserEmail());
            signupDto.setUserPassword(currentUser.getUserPassword());
            signupDto.setUserSeq(currentUser.getUserSeq());
            signupDto.setResult(SignupDto.SignupResult.SUCCESS);
            return signupDto;
        }
        signupDto.setResult(SignupDto.SignupResult.FAILURE);
        return signupDto;
    }

    public SignupDto login(Map<String, String> req) {
        SignupDto signupDto = new SignupDto();
        // 해당 email(id) 있는지 확인 -> 있으면 그 사용자 password 사용해서 확인하기
        UserEntity user = userRepository.findByUserEmail(req.get("userEmail"));
        if (user == null) {
            signupDto.setResult(SignupDto.SignupResult.FAILURE);
            return signupDto;
        }
        if (Objects.equals(CryptoUtil.Sha512.hash(req.get("userPassword")), user.getUserPassword())) {
            signupDto.setUserEmail(user.getUserEmail());
            signupDto.setUserSeq(user.getUserSeq());
            signupDto.setResult(SignupDto.SignupResult.SUCCESS);
            return signupDto;
        }
        signupDto.setResult(SignupDto.SignupResult.FAILURE);
        return signupDto;
    }

    public boolean typeChange(Long userSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        char type = user.getUserType();
        // 해당 유저가 이미 화가 회원이면 False
        if (Objects.equals(type, 'A')) { return false; }
        // 해당 유저가 일반 회원이면 타입 변환해주고 True
        if (Objects.equals(type, 'N')) {
            user.setUserType('A');
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean quitUser(Long userSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        userRepository.delete(user);
        return true;
    }

    public void profileChange(Long userSeq, Map<String, String> req) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        user.setUserNickname(req.get("userNickname"));
        user.setUserDesc(req.get("userDesc"));
        userRepository.save(user);
    }

    public boolean passwordChange(Long userSeq, Map<String ,String> req) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        if (!Objects.equals(user.getUserPassword(), CryptoUtil.Sha512.hash(req.get("userPassword")))) {
            return false;
        }
        user.setUserPassword(CryptoUtil.Sha512.hash(req.get("changeUserPassword")));
        userRepository.save(user);
        return true;
    }

    public boolean followUser(Long currentUserSeq, Long followUserSeq) {
        UserEntity followUser = userRepository.findByUserSeq(followUserSeq);
        UserEntity currentUser = userRepository.findByUserSeq(currentUserSeq);
        if (followUser == null) { return false; }
        // 이미 팔로우하고 있으면 false 반환
        if (followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(currentUserSeq, followUserSeq).isPresent()) {
            return false;
        }
        // follow tb에 추가
        FollowEntity followEntity = new FollowEntity();
        followEntity.setFollower(currentUser);
        followEntity.setFollowing(followUser);
        followRepository.save(followEntity);
        // user tb에 각 followerCount + 1, followingCount + 1
        followUser.setUserFollowerCount(followUser.getUserFollowerCount() + 1);
        userRepository.save(followUser);
        currentUser.setUserFollowingCount(currentUser.getUserFollowingCount() + 1);
        userRepository.save(currentUser);
        return true;
    }

    public boolean unfollowUser(Long currentUserSeq, Long followUserSeq) {
        UserEntity followUser = userRepository.findByUserSeq(followUserSeq);
        UserEntity currentUser = userRepository.findByUserSeq(currentUserSeq);
        if (followUser == null) { return false; }
        Optional<FollowEntity> followEntity = followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(currentUserSeq, followUserSeq);
        // 팔로우한 적 없으면 false 반환
        if (!followEntity.isPresent()) {
            return false;
        }
        followRepository.delete(followEntity.get());
        currentUser.setUserFollowingCount(currentUser.getUserFollowingCount() - 1);
        userRepository.save(currentUser);
        followUser.setUserFollowerCount(followUser.getUserFollowerCount() - 1);
        userRepository.save(followUser);
        return true;
    }

    public FollowerPageDto followerList(Long currentUserSeq, Long pageUserSeq, int page) {
        // 해당 마이페이지의 유저가 존재하는지 확인
        UserEntity pageUser = userRepository.findByUserSeq(pageUserSeq);
        if (pageUser == null) {
            FollowerPageDto followerPageDto = new FollowerPageDto();
            followerPageDto.setTotalPage(0);
            followerPageDto.setPage(0);
            followerPageDto.setResult(FollowDto.FollowResult.NO_SUCH_USER);
            return followerPageDto;
        }
        int offset = LIMIT * (page - 1);
        List<FollowEntity> followEntities = followRepository.findFollowerList(pageUserSeq, LIMIT, offset);
        // 팔로워가 없을 때
        if (followEntities.isEmpty()) {
            FollowerPageDto followerPageDto = new FollowerPageDto();
            followerPageDto.setTotalPage(0);
            followerPageDto.setPage(0);
            followerPageDto.setResult(FollowDto.FollowResult.EMPTY);
            return followerPageDto;
        }
        int totalPage = (int) Math.ceil((followRepository.countAllByFollowing_UserSeq(pageUserSeq))/(double)LIMIT);
        List<FollowerListDto> followerListDtoList = new ArrayList<>();
        for (FollowEntity followEntity:followEntities) {
            if (followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(currentUserSeq, followEntity.getFollower().getUserSeq()).isPresent()) {
                FollowerListDto followerListDto = new FollowerListDto(followEntity, currentUserSeq, 'Y');
                followerListDtoList.add(followerListDto);
            }
            else {
                FollowerListDto followerListDto = new FollowerListDto(followEntity, currentUserSeq, 'N');
                followerListDtoList.add(followerListDto);
            }
        }
        FollowerPageDto followerPageDto = new FollowerPageDto(totalPage, page, followerListDtoList);
        followerPageDto.setResult(FollowDto.FollowResult.SUCCESS);
        return followerPageDto;
    }

    public FollowingPageDto followingList(Long currentUserSeq, Long pageUserSeq, int page) {
        // 해당 마이페이지의 유저가 존재하는지 확인
        UserEntity pageUser = userRepository.findByUserSeq(pageUserSeq);
        if (pageUser == null) {
            FollowingPageDto followingPageDto = new FollowingPageDto();
            followingPageDto.setTotalPage(0);
            followingPageDto.setPage(0);
            followingPageDto.setResult(FollowDto.FollowResult.NO_SUCH_USER);
            return followingPageDto;
        }
        int offset = LIMIT * (page - 1);
        List<FollowEntity> followEntities = followRepository.findFollowingList(pageUserSeq, LIMIT, offset);
        // 팔로잉이 없을 때
        if (followEntities.isEmpty()) {
            FollowingPageDto followingPageDto = new FollowingPageDto();
            followingPageDto.setTotalPage(0);
            followingPageDto.setPage(0);
            followingPageDto.setResult(FollowDto.FollowResult.EMPTY);
            return followingPageDto;
        }
        int totalPage = (int) Math.ceil((followRepository.countAllByFollower_UserSeq(pageUserSeq))/(double)LIMIT);
        List<FollowingListDto> followingListDtoList = new ArrayList<>();
        for (FollowEntity followEntity:followEntities) {
            if (followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(currentUserSeq, followEntity.getFollowing().getUserSeq()).isPresent()) {
                FollowingListDto followingListDto = new FollowingListDto(followEntity, currentUserSeq, 'Y');
                followingListDtoList.add(followingListDto);
            }
            else {
                FollowingListDto followingListDto = new FollowingListDto(followEntity, currentUserSeq, 'N');
                followingListDtoList.add(followingListDto);
            }
        }
        FollowingPageDto followingPageDto = new FollowingPageDto(totalPage, page, followingListDtoList);
        followingPageDto.setResult(FollowDto.FollowResult.SUCCESS);
        return followingPageDto;
    }

    public BookmarkDto bookmarkPiece(Long userSeq, Long pieceSeq) {
        UserEntity userEntity = userRepository.findByUserSeq(userSeq);
        PieceEntity pieceEntity = pieceRepository.findByPieceSeq(pieceSeq);
        BookmarkDto bookmarkDto = new BookmarkDto();
        // 작품이 있는지 확인
        if (pieceEntity == null) {
            bookmarkDto.setResult(BookmarkDto.BookmarkResult.NO_SUCH_PIECE);
            return bookmarkDto;
        }
        // 북마크한 적 있는지 확인
        if (followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(userSeq, pieceSeq).isPresent()) {
            bookmarkDto.setResult(BookmarkDto.BookmarkResult.ALREADY_BOOKMARK);
            return bookmarkDto;
        }
        // 북마크하기
        BookmarkEntity bookmarkEntity = new BookmarkEntity();
        bookmarkEntity.setBookmarker(userEntity);
        bookmarkEntity.setBookmarking(pieceEntity);
        bookmarkRepository.save(bookmarkEntity);
        // pieceTb에 pieceBookmarkCount + 1
        pieceEntity.setPieceBookmarkCount(pieceEntity.getPieceBookmarkCount() + 1);
        pieceRepository.save(pieceEntity);
        bookmarkDto.setResult(BookmarkDto.BookmarkResult.SUCCESS);
        return bookmarkDto;
    }

    public BookmarkDto unbookmarkPiece(Long userSeq, Long pieceSeq) {
        PieceEntity pieceEntity = pieceRepository.findByPieceSeq(pieceSeq);
        BookmarkDto bookmarkDto = new BookmarkDto();
        // 작품 있는지 확인
        if (pieceEntity == null) {
            bookmarkDto.setResult(BookmarkDto.BookmarkResult.NO_SUCH_PIECE);
            return bookmarkDto;
        }
        // 북마크한 적 있는지 확인
        Optional<BookmarkEntity> bookmarkEntity = bookmarkRepository.findAllByBookmarker_UserSeqAndBookmarking_PieceSeq(userSeq, pieceSeq);
        if (!bookmarkEntity.isPresent()) {
            bookmarkDto.setResult(BookmarkDto.BookmarkResult.NO_SUCH_PIECE);
            return bookmarkDto;
        }
        // 북마크 삭제하기
        bookmarkRepository.delete(bookmarkEntity.get());
        // pieceTb에 pieceBookmarkCount - 1
        pieceEntity.setPieceBookmarkCount(pieceEntity.getPieceBookmarkCount() - 1);
        pieceRepository.save(pieceEntity);
        bookmarkDto.setResult(BookmarkDto.BookmarkResult.SUCCESS);
        return bookmarkDto;
    }

    public List<BookmarkListDto> bookmarkList(Long userSeq) {

        List<BookmarkEntity> bookmarkEntities = bookmarkRepository.findBookmarkEntitiesByBookmarker_UserSeq(userSeq);

        // 북마크한 작품이 없을 때
        if (bookmarkEntities.isEmpty()) {
//            BookmarkPageDto bookmarkPageDto = new BookmarkPageDto();
//            bookmarkPageDto.setTotalPage(0);
//            bookmarkPageDto.setPage(0);
//            bookmarkPageDto.setResult(BookmarkDto.BookmarkResult.NO_SUCH_PIECE);
            return new ArrayList<>();
        }
//        int totalPage = (int) Math.ceil((bookmarkRepository.countAllByBookmarker_UserSeq(userSeq))/(double)LIMIT);

        List<BookmarkListDto> bookmarkListDtos = new ArrayList<>();

        for(BookmarkEntity bookmark:bookmarkEntities){
            // 엔티티-->리스트dto변환
            bookmarkListDtos.add(new BookmarkListDto(bookmark));
        }

        return bookmarkListDtos;
    }

    public UserInfoDto userInfo(Long userSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        return new UserInfoDto(user);
    }

    // jwt 없는 경우
    public MypageDto myPage(Long userSeq) {
        // 유저가 있는지 확인
        UserEntity pageUser = userRepository.findByUserSeq(userSeq);
        if (pageUser == null) {
            MypageDto mypageDto = new MypageDto();
            mypageDto.setResult(SignupDto.SignupResult.NO_SUCH_USER);
            return mypageDto;
        }
        // 있으면 정보 가져오기
        MypageDto mypageDto = new MypageDto(pageUser);
        mypageDto.setUserIsMe('N');
        mypageDto.setUserFollowYn('N');
        mypageDto.setResult(SignupDto.SignupResult.SUCCESS);
        return mypageDto;
    }

    // jwt 있는 경우
    public MypageDto myPageJwt(Long currentUserSeq, Long pageUserSeq) {
        UserEntity pageUser = userRepository.findByUserSeq(pageUserSeq);
        if (pageUser == null) {
            MypageDto mypageDto = new MypageDto();
            mypageDto.setResult(SignupDto.SignupResult.NO_SUCH_USER);
            return mypageDto;
        }
        MypageDto mypageDto = new MypageDto(pageUser);
        if (Objects.equals(mypageDto.getUserSeq(), currentUserSeq)) {
            mypageDto.setUserIsMe('Y');
        }
        else { mypageDto.setUserIsMe('N'); }
        if (followRepository.findAllByFollower_UserSeqAndFollowing_UserSeq(currentUserSeq, pageUserSeq).isPresent()) {
            mypageDto.setUserFollowYn('Y');
        }
        else { mypageDto.setUserFollowYn('N'); }
        mypageDto.setResult(SignupDto.SignupResult.SUCCESS);
        return mypageDto;
    }

    public String userProfileImgService(Long currentUserSeq, String img) {
        UserEntity user = userRepository.findByUserSeq(currentUserSeq);
        user.setUserImg(img);
        try {
            userRepository.save(user);
        } catch (Exception e) {
            return "fail";
        }

        return "success";

    }

    public String checkNicknameService(String nickname) {
        Optional<UserEntity> userEntity = userRepository.findByUserNickname(nickname);
        if(userEntity.isPresent()) {
            return "중복";
        } else {
            return "success";
        }
    }

    public List<ArtistDto> randomArtistService() {
        Set<ArtistDto> userSet = new HashSet<>();

        // 리스트로 받아오고
        List<UserEntity> userEntityList = userRepository.findUserEntitiesByUserType('A');
        // 그 사이즈를 파악하고
        int size = userEntityList.size();

        while (userSet.size()<3) {
            // 사이즈 안에서 랜덤
            int randomIndex = (int) (Math.random()*(size));
            if(randomIndex>0) {
                UserEntity userEntity = userEntityList.get(randomIndex);
                ArtistDto artistDto = new ArtistDto(userEntity);
                userSet.add(artistDto);
            }
        }

        List<ArtistDto> artistDtos = new ArrayList<>(userSet);

        return artistDtos;

    }
}
