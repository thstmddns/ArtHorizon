import React from "react";
import { redirect } from "react-router-dom";

const Navi = () => {
  const goMain = () => {
    return redirect("/");
  };

  const goPieces = () => {
    return redirect("/pieces");
  };

  const goHelp = () => {
    return redirect("/help");
  };

  const goMyPage = () => {
    return redirect("/mypage");
  };

  return (
    <div>
      <div>
        {/* 여기에 로고가 들어갈 예정 */}
        <div onClick={goMain}>Art Horizon</div>
      </div>
      <div>
        <div onClick={goPieces}>작품 목록</div>
        <div>게임</div>
        <div>그림분류</div>
        <div onClick={goHelp}>고객센터</div>
      </div>
      <div>
        {/* 유저 관련 아이콘 */}
        <div onClick={goMyPage}>user</div>
      </div>
    </div>
  );
};

export default Navi;
