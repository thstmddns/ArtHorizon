import React from "react";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const navigate = useNavigate();

  return (
    <section className="text-gray-600 body-font border-solid border-gray-50 border-b-2">
      <div className="container py-48 mx-auto">
        {/* 화가 소개 헤더 */}
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              data-aos="fade-right"
            >
              화가 소개
            </h1>
            <div className="h-1 w-20 bg-amber-300 rounded"></div>
          </div>
          <p
            className="lg:w-1/2 w-full leading-relaxed text-gray-500"
            data-aos="fade-left"
          >
            Art Horizon에서는 누구나 화가가 될 수 있고, 관람객이 될 수 있습니다.
            버튼 클릭 한 번으로 손쉽게 화가로 전환할 수 있고, 본인의 작품을 올려
            다른 사람들에게 즐거움을 줄 수 있습니다. 화가를 찾아보세요.
          </p>
        </div>

        {/* 화가 아이템 */}
        <div data-aos="flip-up">
          <div
            className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/1`)}
          >
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-indigo-500 flex-shrink-0">
              <img
                className="w-full h-full object-cover object-center rounded-full"
                src={`https://source.unsplash.com/${parseInt(
                  Math.random() * 100 * 5
                )}x${parseInt(Math.random() * 100 * 5)}`}
                alt="blog"
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                예술인
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine.
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center">
                작가 페이지 이동
              </div>
            </div>
          </div>
        </div>

        {/* 화가 아이템 */}
        <div data-aos="flip-down">
          <div
            className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/1`)}
          >
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                미술가
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine.
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center">
                작가 페이지 이동
              </div>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-indigo-500 flex-shrink-0">
              <img
                className="w-full h-full object-cover object-center rounded-full"
                src={`https://source.unsplash.com/${parseInt(
                  Math.random() * 100 * 5
                )}x${parseInt(Math.random() * 100 * 5)}`}
                alt="blog"
              />
            </div>
          </div>
        </div>

        {/* 화가 아이템 */}
        <div data-aos="flip-up">
          <div
            className="flex items-center lg:w-3/5 mx-auto p-8 mb-10 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/1`)}
          >
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-indigo-500 flex-shrink-0">
              <img
                className="w-full h-full object-cover object-center rounded-full"
                src={`https://source.unsplash.com/${parseInt(
                  Math.random() * 100 * 5
                )}x${parseInt(Math.random() * 100 * 5)}`}
                alt="blog"
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                피카소
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine.
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center">
                작가 페이지 이동
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artists;
