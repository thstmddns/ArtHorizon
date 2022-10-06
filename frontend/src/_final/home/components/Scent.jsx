import React from "react";

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
            자신만의 개성으로 무장한 신인 화가들의 작품을 만나보세요. 그들과
            소통하고 공감하세요. 오직 Art Horizon 에서만 가능합니다.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-amber-400 inline-flex"></div>
          </div>
        </div>

        {/* 6개의 어쩌고 */}
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-sky-300 rounded flex p-4 h-full items-center">
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
                Authentic Cliche Forage
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-sky-300 rounded flex p-4 h-full items-center">
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
                Kinfolk Chips Snackwave
              </span>
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
              <span className="title-font font-medium text-white">
                Coloring Book Ethical
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
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
              <span className="title-font font-medium text-white">
                Typewriter Polaroid Cray
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-right">
            <div className="bg-sky-500 rounded flex p-4 h-full items-center">
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
                Pack Truffaut Blue
              </span>
            </div>
          </div>
          <div className="p-2 sm:w-1/2 w-full" data-aos="fade-left">
            <div className="bg-sky-500 rounded flex p-4 h-full items-center">
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
                The Catcher In The Rye
              </span>
            </div>
          </div>
        </div>
        <button
          className="flex mx-auto mt-16 text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
          data-aos="fade-down"
        >
          그림의 향 찾으러 가기!
        </button>
      </div>
    </section>
  );
};

export default Reviews;
