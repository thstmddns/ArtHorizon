import React from "react";
import { Link } from "react-router-dom";

const StyleTransfer = () => {
  return (
    <section className="text-gray-600 body-font border-solid border-gray-50 border-b-2">
      <div className="container px-5 py-48 mx-auto">
        {/* 스타일 트랜스퍼 헤더 */}
        <div className="text-center mb-20">
          <h1
            className="text-3xl font-medium title-font text-gray-900 mb-4"
            data-aos="fade-up"
          >
            AI 스타일
          </h1>
          <p
            className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
            data-aos="fade-in"
          >
            마음에 드는 이미지가 있으신가요? 남들과는 다른 것을 원하시나요?
            <br /> 그 이미지를 원하는 그림의 스타일로 바꿔 드립니다. 무료로 지금
            바로 시작하세요.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-sky-300 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {/* 아이템 */}
          <div
            className="p-4 md:w-1/3 flex flex-col text-center items-center"
            data-aos="zoom-in"
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-200 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-xl mb-3">변환</h2>
              <p className="leading-relaxed text-base text-gray-500">
                어떤 이미지를 바꾸고 싶으신가요? 유명한 작품? 당신의 소장품?
                아니면 추억에 남은 사진? 어떤 것이든 다 가능합니다.
              </p>
            </div>
          </div>
          {/* 아이템 */}
          <div
            className="p-4 md:w-1/3 flex flex-col text-center items-center"
            data-aos="zoom-in"
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-300 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-xl mb-3">명화</h2>
              <p className="leading-relaxed text-base text-gray-500">
                저희 DB에 저장된 명화들을 제공해드립니다. 여기서 마음에 드는
                작품을 골라주세요. 선택은 언제든지 가능합니다.
              </p>
            </div>
          </div>
          {/* 아이템 */}
          <div
            className="p-4 md:w-1/3 flex flex-col text-center items-center"
            data-aos="zoom-in"
          >
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-400 text-indigo-500 mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-xl mb-3">결과</h2>
              <p className="leading-relaxed text-base text-gray-500">
                이미지를 선택하셨다면, 시작하세요. AI가 여러분이 선택한 이미지를
                스타일링합니다. 마음에 들었다면 다운로드 하세요!
              </p>
            </div>
          </div>
        </div>
        <Link to="/style" data-aos="fade-down">
          <button className="flex mx-auto mt-16 text-white bg-sky-400 border-0 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition">
            AI 스타일 시작
          </button>
        </Link>
      </div>
    </section>
  );
};

export default StyleTransfer;
