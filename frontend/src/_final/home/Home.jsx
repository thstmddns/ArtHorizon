import React from "react";

import NavBar from "../../components/NavBar";
import Intro from "./components/Intro";
import Tags from "./components/Tags";
import StyleTransfer from "./components/StyleTransfer";
import Scent from "./components/Scent";
import Artists from "./components/Artists";
import Reviews from "./components/Reviews";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <React.Fragment>
      {/* 내비게이션 바 */}
      <NavBar />
      {/* 인트로 */}
      <Intro />
      {/* 태그 소개 */}
      <Tags />
      {/* 스타일 트랜스퍼 */}
      <StyleTransfer />
      {/* 그림의 향 */}
      <Scent />
      {/* 화가 소개 */}
      <Artists />
      {/* 후기 */}
      <Reviews />
      {/* 푸터 */}
      <Footer />
    </React.Fragment>
  );
};

export default Home;
