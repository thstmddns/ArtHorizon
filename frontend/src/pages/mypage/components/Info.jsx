import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authApi } from "../../../api/api";

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { targetUserSeq } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState();
  const [isFollowed, setIsFollowed] = useState(false); // 해당 사용자 팔로우 했는지 여부

  useEffect(() => {
    authApi
      .getMyPage(targetUserSeq)
      .then((res) => {
        setUserData(res.data);
        setIsFollowed(res.data.userFollowYn === "Y" ? true : false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          navigate("/404", { replace: true });
          toast.error("존재하지 않는 유저입니다");
        }
      });
  }, [dispatch, navigate, targetUserSeq, isFollowed]);

  // 팔로우 버튼 클릭
  const followHandler = () => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.info("로그인이 필요합니다");
    }
    authApi.follow(targetUserSeq).then(() => setIsFollowed(true));
  };

  // 팔로우 해제 버튼 클릭
  const unfollowHandler = () => {
    authApi.unfollow(targetUserSeq).then(() => setIsFollowed(false));
  };

  return (
    <div className="flex justify-between pb-10 mb-10" data-aos="fade-in">
      <div className="flex ">
        {/* 프사 */}
        {!userData?.userImg && (
          <div className="w-40 h-40 bg-gray-100 rounded-3xl border-solid border border-gray-200 drop-shadow-md mr-8"></div>
        )}
        {userData?.userImg && (
          <img
            src={`http://j7d201.p.ssafy.io/api/my-file/read/${userData?.userImg}`}
            alt="profile-img"
            className="w-40 h-40 rounded-3xl drop-shadow-md mr-8"
          />
        )}

        {/* 정보 */}
        <div className="flex flex-col mt-2">
          <div className="flex mb-5">
            <div className="font-bold text-3xl mr-2">
              {userData?.userNickname}
            </div>
            <div className="text-sky-500 font-bold mt-1">
              {userData?.userType === "A" && "화가"}
              {userData?.userType === "N" && "일반"}
            </div>
          </div>
          <div className="mb-5">
            <div className="text-gray-500">{userData?.userEmail}</div>
          </div>
          <div className="flex mb-3">
            <div className="flex mr-4">
              <div className="mr-1">나의 작품</div>
              <div className="font-bold">{userData?.userArtCount}</div>
            </div>
            <div className="flex mr-4">
              <div className="mr-1">팔로워</div>
              <div className="font-bold">{userData?.userFollowerCount}</div>
            </div>
            <div className="flex mr-4">
              <div className="mr-1">팔로잉</div>
              <div className="font-bold">{userData?.userFollowingCount}</div>
            </div>
          </div>
          <div className="text-gray-500">{userData?.userDesc}</div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5">
        {userData?.userIsMe === "Y" && (
          <button
            onClick={() => navigate("/usermodify")}
            className="inline-flex items-center text-amber-500 py-3 px-8 border-amber-500 focus:outline-none hover:text-white hover:bg-amber-500 hover:drop-shadow-md border border-white hover:border hover:border-amber-200 rounded-lg transition"
          >
            프로필 수정
          </button>
        )}
        {userData?.userIsMe === "N" && !isFollowed && (
          <button
            onClick={followHandler}
            className="py-3 px-8 text-white bg-sky-400 border-sky-400 focus:ring-4 focus:ring-sky-300 hover:bg-sky-500 hover:drop-shadow-md border border-white rounded-lg transition"
          >
            팔로우
          </button>
        )}
        {userData?.userIsMe === "N" && isFollowed && (
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
