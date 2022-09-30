import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, logout } from "../redux/authSlice";

import logoImage from "../assets/images/Art_Horizon_Logo.png";

const NavBar = () => {
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
    <div className="bg-white fixed inset-x-0 top-0 z-50">
      <nav
        className="body-font container px-5 mx-auto flex py-3 flex-col md:flex-row items-center bg-white-100"
        style={{ height: "70px" }}
      >
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={logoImage} className="w-30 h-10" alt="logoImage" />
        </Link>
        <div className="text-gray-600 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link
            to={"/pieces"}
            className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition"
          >
            작품 목록
          </Link>
          <Link className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition">
            스타일 트랜스퍼
          </Link>
          <Link className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition">
            그림의 향
          </Link>
        </div>

        {/* 로그인 x */}
        {!isLoggedIn && (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-1"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              회원가입
            </button>
          </div>
        )}

        {/* 로그인 o */}
        {isLoggedIn && (
          <div>
            <button
              onClick={() => navigate(`/mypage/${userSeq}`)}
              className="inline-flex items-center text-amber-500 border-0 py-1 px-3 focus:outline-none hover:text-aber-700 hover:bg-amber-50 hover:drop-shadow-md rounded text-base mt-4 md:mt-0 mr-1 transition"
            >
              {myNickname}
            </button>
            <button
              onClick={() => dispatch(logout())}
              className="inline-flex items-center bg-zinc-700 text-white border-0 py-1 px-3 focus:outline-none hover:bg-zinc-900 hover:text-zinc-100 hover:drop-shadow-md rounded text-base mt-4 md:mt-0 transition"
            >
              로그아웃
            </button>
          </div>
        )}
      </nav>
      <div className="h-px w-full bg-gray-200"></div>
    </div>
  );
};

export default NavBar;
