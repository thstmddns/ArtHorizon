import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, getUser } from "../../redux/authSlice";

// import loginBackgroundImage from "../../assets/images/loginBackgroundImage.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.trim() && !password.trim()) {
      toast.warn("이메일을 입력하세요");
      toast.warn("비밀번호를 입력하세요");
      return;
    } else if (!email.trim()) {
      toast.warn("이메일을 입력하세요");
      return;
    } else if (!password.trim()) {
      toast.warn("비밀번호를 입력하세요");
      return;
    }

    const loginData = JSON.stringify({
      userEmail: email,
      userPassword: password,
    });
    setEmail("");
    setPassword("");
    dispatch(login(loginData))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("성공적으로 로그인했습니다");
      })
      .catch((err) => {
        console.error("err:", err);
        toast.error("로그인에 실패했습니다");
      });
  };

  return (
    <section className="relative">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('https://source.unsplash.com/random')`,
        }}
        data-aos="fade-in"
      ></div>

      {/* 로그인 폼 */}
      <div className="container px-5 py-48 mx-auto flex" data-aos="fade-left">
        <form
          method="post"
          className="bg-gray-50 lg:w-1/3 md:w-1/2 bg-white rounded-lg p-12 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 drop-shadow-md"
          onSubmit={submitHandler}
        >
          <h2 className="text-gray-900 text-3xl mb-6 font-bold title-font text-center">
            로그인
          </h2>
          <p className="mb-8 text-gray-500 text-center">
            Art Horizon에 오신 것을 환영합니다. 더 많은 서비스 이용을 위해
            로그인해주세요.
          </p>
          {/* 이메일 */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-gray-900">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="relative mb-8">
            <label htmlFor="password" className="leading-7 text-gray-900">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 버튼 */}
          <button
            className="text-white bg-amber-400 py-2 px-6 rounded-lg text-lg hover:bg-amber-500 focus:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition"
            onClick={submitHandler}
          >
            로그인하기
          </button>
          <Link to="/signup" className="text-xs text-gray-500 mt-3 text-center">
            회원가입
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
