import React, { useState, useEffect } from "react";
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
  const [picture, setPicture] = useState("");
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
        console.log(res.data);
        setNickname(res.data.userNickname);
        setUserType(res.data.userType);
        setPicture(res.data.userImg);
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
    <div className="flex justify-between border-solid border-b border-gray-200 pb-14 mb-14">
      <div className="flex ">
        {/* 프사 */}
        <div className="w-40 h-40 bg-gray-100 rounded-3xl border-solid border border-gray-200 drop-shadow-md mr-8">
          <img src={picture} />
        </div>

        {/* 정보 */}
        <div className="flex flex-col mt-5">
          <div className="flex mb-5">
            <div className="font-bold text-3xl mr-2">{nickname}</div>
            <div className="text-sky-500 font-bold mt-1">
              {userType === "A" ? "화가" : "일반"}
            </div>
          </div>
          <div className="mb-5">
            <div className="text-gray-500">{email}</div>
          </div>
          <div className="flex">
            <div className="flex mr-4">
              <div className="mr-1">나의 작품</div>
              <div className="font-bold">{numOfArts}</div>
            </div>
            <div className="flex mr-4">
              <div className="mr-1">팔로워</div>
              <div className="font-bold">{numOfFollowers}</div>
            </div>
            <div className="flex mr-4">
              <div className="mr-1">팔로잉</div>
              <div className="font-bold">{numOfFollowings}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5">
        {isMine && (
          <button
            onClick={() => navigate("/usermodify")}
            className="inline-flex items-center text-amber-500 py-3 px-8 border-amber-500 focus:outline-none hover:text-white hover:bg-amber-500 hover:drop-shadow-md border border-white hover:border hover:border-amber-200 rounded-lg transition"
          >
            프로필 수정
          </button>
        )}
        {!isMine && !isFollowed && (
          <button
            onClick={followHandler}
            className="py-3 px-8 text-white bg-sky-400 border-sky-400 focus:ring-4 focus:ring-sky-300 hover:bg-sky-500 hover:drop-shadow-md border border-white rounded-lg transition"
          >
            팔로우
          </button>
        )}
        {!isMine && isFollowed && (
          <button
            onClick={unfollowHandler}
            className="py-3 px-8 text-sky-400 bg-white border-sky-400 focus:ring-4 focus:ring-sky-300 hover:bg-sky-400 hover:text-white hover:drop-shadow-md border border-white rounded-lg transition"
          >
            팔로우 해제
          </button>
        )}
      </div>
    </div>
  );
};

export default Info;
