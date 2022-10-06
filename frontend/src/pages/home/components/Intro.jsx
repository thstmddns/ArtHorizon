import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Intro = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth.isLoggedIn);

  const goRegisterHandler = () => {
    if (!isLoggedIn) {
      toast.info("로그인이 필요한 서비스입니다");
    }
    navigate("/register");
  };

  return (
    <section
      className="text-gray-600 body-font border-solid border-gray-50 border-b-2 bg-white"
      style={{ marginTop: "71px" }}
    >
      <div className="container px-5 py-64 mx-auto">
        {/* 인트로 헤더 */}
        <div className="text-center mb-20">
          <div className="flex justify-center" data-aos="fade-down">
            <h1 className="text-9xl font-medium title-font text-amber-500 mb-4">
              Art
            </h1>
            <h1 className="text-9xl font-medium title-font text-amber-300 mb-4">
              Horizon
            </h1>
          </div>

          <p
            className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
            data-aos="fade-in"
          >
            바다와 하늘의 지평선처럼 화가와 관람객을 이어주는{" "}
            <strong>Art Horzion</strong>. <br /> 화가 여러분들은 이곳에
            올림으로써 당신의 작품이 전세계 누구나 볼 수 있을 겁니다. <br />{" "}
            작품을 보러 오신 여러분, 이곳에서 처음 만나는 작가의 작품을
            관람해보세요. <br /> 아직 많이 낯설으시다고요? 그런 분들을 위한
            재미있는 서비스도 있으니 즐겨주시기 바랍니다.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-sky-300 inline-flex"></div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div data-aos="fade-up">
            <button
              className="flex mr-4 text-white border-gray-300 bg-amber-400 border-0 py-4 px-12 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 hover:drop-shadow-md rounded-lg text-xl font-bold transition"
              onClick={() => navigate("/pieces")}
            >
              작품 구경하러 가기!
            </button>
          </div>

          <div data-aos="fade-up">
            <button
              className="flex text-white bg-sky-400 py-4 px-12 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 hover:drop-shadow-md rounded-lg text-xl font-bold transition"
              onClick={goRegisterHandler}
            >
              나의 작품 전시하기!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
