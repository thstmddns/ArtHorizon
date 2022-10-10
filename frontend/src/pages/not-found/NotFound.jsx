import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100"
      data-aos="fade-in"
    >
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="flex flex-col mb-8 font-extrabold text-9xl">
            <span className="text-amber-500">404</span>
            <span className="text-6xl text-sky-400">Not Found</span>
          </h2>
          <p className="text-2xl font-bold text-gray-700">
            존재하지 않는 페이지입니다!
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            홈 페이지로 돌아가려면 아래 버튼을 누르세요.
          </p>
          <Link
            to="/"
            replace
            className="px-8 py-3 text-white font-bold rounded-lg bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-200 transition"
          >
            홈 페이지로 이동
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
