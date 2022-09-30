import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../../../redux/authSlice";
import { authApi } from "../../../api/api";

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { targetUserSeq } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [nickname, setNickname] = useState("");
  const [userType, setUserType] = useState("N");
  const [email, setEmail] = useState("");
  const [numOfArts, setNumOfArts] = useState(0);
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const [numOfFollowings, setNumOfFollowings] = useState(0);
  const [isMine, setIsMine] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const getMyPageInfo = async () => {
      try {
        const res = await authApi.getMyPage(targetUserSeq);
        setNickname(res.data.userNickname);
        setUserType(res.data.userType);
        setEmail(res.data.userEmail);
        setNumOfArts(res.data.userArtCount);
        setNumOfFollowers(res.data.userFollowerCount);
        setNumOfFollowings(res.data.userFollowingCount);
        setIsMine(res.data.userIsMe === "Y" ? true : false);
        setIsFollowed(res.data.userFollowYn === "Y" ? true : false);
      } catch (error) {
        console.error("해당하는 유저가 존재하지 않습니다");
      }
    };
    getMyPageInfo();
    dispatch(getUser());
    // authApi
    //   .getFollowers(1)
    //   .then((res) => console.log("팔로워를가져오겠다:", res))
    //   .catch((err) => console.error(err));
  }, [dispatch, targetUserSeq, isLoggedIn, isFollowed]);

  const followHandler = () => {
    const followUser = async () => {
      try {
        await authApi.follow(targetUserSeq);
        setIsFollowed(true);
      } catch (error) {}
    };
    followUser();
  };

  const unfollowHandler = () => {
    const unfollowUser = async () => {
      try {
        await authApi.unfollow(targetUserSeq);
        setIsFollowed(false);
      } catch (error) {}
    };
    unfollowUser();
  };

  return (
    <Wrapper>
      <ImageBox>{/* <img /> */}</ImageBox>

      <ContentBox>
        <Row>
          <Nickname>{nickname}</Nickname>
          <Classification>{userType === "A" ? "화가" : "일반"}</Classification>
        </Row>
        <Row>
          <Email>{email}</Email>
        </Row>
        <Row>
          <Col>나의 그림 {numOfArts}</Col>
          <Col>팔로워 {numOfFollowers}</Col>
          <Col>팔로잉 {numOfFollowings}</Col>
        </Row>
      </ContentBox>

      {isMine && (
        <SecondaryButton onClick={() => navigate("/usermodify")}>
          프로필 수정
        </SecondaryButton>
      )}
      {!isMine && !isFollowed && (
        <PrimaryButton onClick={followHandler}>팔로우</PrimaryButton>
      )}
      {!isMine && isFollowed && (
        <SecondaryButton onClick={unfollowHandler}>팔로우 해제</SecondaryButton>
      )}
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #d9dee4;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  border: 1px solid #888383;
  margin-right: 50px;
  background-color: #f5f5f5;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: wheat;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Nickname = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 10px;
`;

const Classification = styled.div`
  color: #6cb6e1;
  margin-top: 20px;
`;

const Email = styled.div``;

const Col = styled.div`
  margin-right: 20px;
`;

// const Button = styled.button`
//   cursor: pointer;
//   background-color: #88c4e6;
//   border: 1px solid #6cb6e1;
//   border-radius: 10px;
//   color: #ffffff;
//   width: 15rem;
//   height: 45px;
//   font-size: 1.2rem;
//   font-weight: bold;
//   margin-top: 10px;
//   margin-bottom: 30px;
//   &:hover {
//     background-color: #6cb6e1;
//     border: 1px solid #88c4e6;
//   }
//   margin-left: auto;
// `;

const PrimaryButton = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
  margin-left: auto;
`;

const SecondaryButton = styled.button`
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #88c4e6;
  border-radius: 10px;
  color: #6cb6e1;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #88c4e6;
    border: 1px solid #6cb6e1;
    color: #ffffff;
  }
  margin-left: auto;
`;
