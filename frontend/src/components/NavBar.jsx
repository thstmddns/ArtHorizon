import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { logout } from "../redux/authSlice";

// import logoImage from "../assets/images/Art_Horizon_Logo.png";
import arthorizonLogo from "../assets/images/arthorizionlogo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    mySeq: userSeq,
    myNickname,
  } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
    toast.success("성공적으로 로그아웃했습니다");
    // window.location.reload();
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 backdrop-blur">
      <nav
        className="body-font container px-5 mx-auto flex py-3 flex-col md:flex-row items-center"
        // style={{ height: "70px" }}
        style={{ height: "7vh" }}
      >
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src={arthorizonLogo} className="w-32 h-24" alt="logoImage" />
        </Link>
        <div className="text-gray-600 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link
            to="/pieces"
            className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition"
          >
            작품 목록
          </Link>
          <Link
            to="/style"
            className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition"
          >
            AI 스타일
          </Link>
          <Link
            to="/scent"
            className="mr-5 text-sky-900 underline-offset-4 hover:underline hover:text-sky-400 transition"
          >
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
              className="inline-flex items-center text-amber-500 py-1 px-3 bg-white border-amber-300 focus:outline-none hover:text-white hover:bg-amber-500 hover:drop-shadow-md border border-white hover:border hover:border-amber-200 rounded-lg text-base mt-4 md:mt-0 mr-1 transition"
            >
              {myNickname}
            </button>
            <button
              onClick={logoutHandler}
              className="inline-flex items-center bg-sky-400 text-white py-1 px-3 focus:outline-none hover:bg-sky-600 hover:drop-shadow-md rounded-lg text-base mt-4 md:mt-0 transition"
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
