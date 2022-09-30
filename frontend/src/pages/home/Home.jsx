import React from "react";

import NavBar from "../../components/NavBar";
import Intro from "./components/Intro";
import Artists from "./components/Artists";
import Tags from "./components/Tags";
import StyleTransfer from "./components/StyleTransfer";
import Reviews from "./components/Reviews";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <React.Fragment>
      {/* 내비게이션 바 */}
      <NavBar />

      <div className="pb-24 mx-auto">
        {/* 인트로 */}
        <Intro />
        {/* 태그 소개 */}
        <Tags />
        {/* 화가 소개 */}
        <Artists />
        {/* 스타일 트랜스퍼 */}
        <StyleTransfer />
        {/* 후기 */}
        <Reviews />
      </div>
      {/* 푸터 */}
      <Footer />
    </React.Fragment>
  );
};

export default Home;
