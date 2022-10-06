import React from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <section className="text-gray-600 body-font border-solid border-gray-100 bg-gray-50 border-b-2">
      <div className="container px-5 py-48 mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-20">
          <h1
            className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4"
            data-aos="fade-up"
          >
            그림의 향
          </h1>
          <p
            className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"
            data-aos="fade-in"
          >
            당신이 선택한 이미지는 어떤 향이 날까요?
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-amber-400 inline-flex"></div>
          </div>
        </div>

        {/* 6개의 어쩌고 */}
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-red-500 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-white">
                스파이시
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-red-300 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-black">로즈</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-yellow-300 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-gray-500">
                시트러스
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-yellow-200 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-black">드라이</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-emerald-500 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-white">그린</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-emerald-200 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-black">허브</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-sky-400 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-white">워터리</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-sky-300 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-black">코튼</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-neutral-500 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-white">스모키</span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-neutral-400 rounded flex p-4 h-full items-center">
              <svg
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium text-black">머스크</span>
            </div>
          </div>
        </div>
        <Link to="/scent" data-aos="fade-down">
          <button className="flex mx-auto mt-16 text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition">
            그림의 향 탐색
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
