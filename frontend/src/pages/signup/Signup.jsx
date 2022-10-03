import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar2 from "../../components/NavBar2";

import { authApi } from "../../api/api";
import { signup } from "../../redux/authSlice";

import loginBackgroundImage from "../../assets/images/loginBackgroundImage.jpg";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!email.trim()) {
      toast.warn("이메일을 입력하세요");
      hasError = true;
    }
    if (!nickname.trim()) {
      toast.warn("닉네임을 입력하세요");
      hasError = true;
    }
    if (!password1.trim()) {
      toast.warn("비밀번호를 입력하세요");
      hasError = true;
    }
    if (!password2.trim()) {
      toast.warn("비밀번호를 한번 더 입력하세요");
      hasError = true;
    }
    if (password1 !== password2) {
      toast.warn("비밀번호가 일치하지 않습니다");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    // const signupData = JSON.stringify({
    //   userEmail: "test@test.com",
    //   userPassword: "test",
    //   userNickname: "테스트",
    //   userType: "N",
    // });

    const signupData = JSON.stringify({
      userEmail: email,
      userPassword: password1,
      userNickname: nickname,
      userType: "N",
    });

    setEmail("");
    setNickname("");
    setPassword1("");
    setPassword2("");
    dispatch(signup(signupData))
      .unwrap()
      .then(() => {
        navigate("/login");
        toast.success("회원 가입에 성공했습니다. 로그인하세요");
      })
      .catch((err) => {
        console.error("err:", err);
        toast.error("회원 가입에 실패했습니다");
      });
  };

  const checkEmailHandler = () => {
    if (!email.trim()) {
      toast.warn("이메일을 입력하세요.");
      return;
    }
    toast.success("사용할 수 있는 이메일입니다.");
    // authApi
    //   .checkEmail(email)
    //   .then((res) => console.log("res:", res))
    //   .catch((err) => console.error("err:", err));
  };

  const checkNicknameHandler = () => {
    if (!nickname.trim()) {
      toast.warn("닉네임을 입력하세요.");
      return;
    }
    authApi
      .checkNickname(nickname)
      .then((res) => {
        console.log("res:", res);
        if (res.data === "SUCCESS") {
          toast.success("사용할 수 있는 닉네임입니다.");
        } else if (res.data === "FAILURE") {
          toast.error("사용할 수 없는 닉네임입니다.");
        }
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  return (
    <React.Fragment>
      <NavBar2 />

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

        {/* 회원가입 폼 */}
        <div className="container px-5 pt-48 mx-auto flex" data-aos="fade-left">
          <form
            method="post"
            className="bg-gray-50 lg:w-1/3 md:w-1/2 bg-white rounded-lg p-12 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 drop-shadow-md"
            onSubmit={submitHandler}
          >
            <h2 className="text-gray-900 text-3xl mb-6 font-bold title-font text-center">
              회원 가입
            </h2>
            <div className="mb-8 text-center">
              <div className="text-gray-500 text-sm">
                Art Horizon에 처음이신가요?
              </div>
              <div className="text-gray-500 text-sm">
                {" "}
                무료 회원가입을 통해 더 나은 서비스 경험을 하세요.
              </div>
            </div>
            {/* 이메일 */}
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-gray-900">
                이메일
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition mr-2"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-amber-400 px-6 rounded-lg text-lg hover:bg-amber-500 focus:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition"
                  onClick={checkEmailHandler}
                ></button>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="relative mb-4">
              <label htmlFor="nickname" className="leading-7 text-gray-900">
                닉네임
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition mr-2"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-amber-400 px-6 rounded-lg text-lg hover:bg-amber-500 focus:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition"
                  onClick={checkNicknameHandler}
                ></button>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="relative mb-4">
              <label htmlFor="password1" className="leading-7 text-gray-900">
                비밀번호
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition"
                placeholder="비밀번호를 입력하세요"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative mb-8">
              <label htmlFor="password2" className="leading-7 text-gray-900">
                비밀번호
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 placeholder:text-gray-300 placeholder:text-sm transition"
                placeholder="비밀번호를 한 번 더 입력하세요"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {/* 버튼 */}
            <button
              className="text-white bg-amber-400 py-2 px-6 rounded-lg text-lg hover:bg-amber-500 focus:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition"
              onClick={submitHandler}
            >
              회원 가입하기
            </button>
            <Link
              to="/login"
              className="text-xs text-gray-500 mt-3 text-center hover:text-gray-900 transition"
            >
              이미 계정이 있으신가요? 로그인
            </Link>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Signup;
