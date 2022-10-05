import React, { useState, useEffect } from "react";

import { piecesApi } from "../../api/api";

import NavBar2 from "../../components/NavBar2";
import LoginForm from "./LoginForm";

const Login = () => {
  const [backgroundImg, setBackgroundImg] = useState();

  useEffect(() => {
    // 배경 그림 가져오기
    const fetchBackgroundImg = async () => {
      const res = await piecesApi.getBackgroundImage();
      setBackgroundImg(res.data.pieceImg);
    };
    fetchBackgroundImg();
  }, []);

  return (
    <React.Fragment>
      <NavBar2 />
      <section className="relative">
        {/* 배경 이미지 */}
        <div
          className="absolute bg-gray-700 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
        {backgroundImg && (
          <div
            className="absolute inset-0 bg-center bg-cover blur"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${backgroundImg}')`,
            }}
          ></div>
        )}
        {/* 로그인 폼 */}
        <LoginForm />
      </section>
    </React.Fragment>
  );
};

export default Login;
