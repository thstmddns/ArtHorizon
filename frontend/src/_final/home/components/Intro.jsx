import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <section
      className="text-gray-600 body-font border-solid border-gray-50 border-b-2 bg-white"
      style={{ marginTop: "71px" }}
    >
      <div className="container px-5 py-64 mx-auto">
        {/* 스타일 트랜스퍼 헤더 */}
        <div className="text-center mb-20">
          <div className="flex justify-center" data-aos="fade-down">
            <h1 className="text-9xl font-medium title-font text-amber-500 mb-4">
              Art
            </h1>
            <h1 className="text-9xl font-medium title-font text-amber-300 mb-4">
              Horizon
            </h1>
          </div>
          {/* <h1 className="text-9xl font-medium title-font text-gray-900 text-amber-300 mb-4">
            Art
          </h1>
          <h1 className="text-9xl font-medium title-font text-gray-900 text-amber-300 mb-4">
            Horizon
          </h1> */}
          <p
            className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
            data-aos="fade-in"
          >
            모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를
            가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를
            보장할 의무를 진다. 모든 국민은 자기의 행위가 아닌 친족의 행위로
            인하여 불이익한 처우를 받지 아니한다. 국회의원의 선거구와 비례대표제
            기타 선거에 관한 사항은 법률로 정한다. 제2항과 제3항의 처분에
            대하여는 법원에 제소할 수 없다. 군사법원의
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-sky-300 inline-flex"></div>
          </div>
        </div>

        <button
          className="flex mx-auto mt-16 text-white bg-amber-400 border-0 py-4 px-12 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 hover:drop-shadow-md rounded-lg text-xl font-bold transition"
          onClick={() => navigate("/pieces")}
          data-aos="fade-up"
        >
          원하는 그림 검색하기
        </button>
      </div>
    </section>
  );
};

export default Intro;
