import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, logout } from "../redux/authSlice";

import logoImage from "../assets/images/Art_Horizon_Logo.png";

const TailwindNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    mySeq: userSeq,
    myNickname,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, isLoggedIn]);

  return (
    <header class="body-font shadow-md">
      <div class="mx-5 flex flex-wrap py-3 flex-col md:flex-row items-center">
        <Link
          to="/"
          class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={logoImage} class="w-30 h-10" alt="logoImage" />
        </Link>
        <nav class="text-gray-600 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link class="mr-5 hover:text-gray-900">작품 목록</Link>
          <Link class="mr-5 hover:text-gray-900">스타일 트랜스퍼</Link>
          <Link class="mr-5 hover:text-gray-900">그림의 향</Link>
          <Link class="mr-5 hover:text-gray-900">고객센터</Link>
        </nav>

        {!isLoggedIn && (
          <div>
            <button
              onClick={() => navigate("/login")}
              class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-1"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              회원가입
            </button>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <button
              onClick={() => navigate(`/mypage/${userSeq}`)}
              class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-1"
            >
              {myNickname}'s 페이지
            </button>
            <button
              onClick={() => dispatch(logout())}
              class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TailwindNavBar;
