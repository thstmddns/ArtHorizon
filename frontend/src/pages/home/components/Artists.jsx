import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { artistApi } from "../../../api/api";

const Artists = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchRandomArtists = async () => {
      const res = await artistApi.getRandomArtists();
      setArtists(res.data);
    };
    fetchRandomArtists();
  }, []);

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

        {/* 화가 1 */}
        <div data-aos="flip-up">
          <div
            className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/${artists[0]?.userSeq}`)}
          >
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-sky-100 flex-shrink-0 drop-shadow-md">
              {artists[0]?.userImg && (
                <img
                  className="w-full h-full object-cover object-center rounded-full"
                  src={`http://j7d201.p.ssafy.io/api/my-file/read/${artists[0]?.userImg}`}
                  alt="userImg"
                />
              )}
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg font-bold mb-2">
                {artists[0]?.userNickname}
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                {artists[0]?.userDesc && artists[0].userDesc}
                {!artists[0]?.userDesc && "상태 메시지 없음"}
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center text-sm">
                화가 페이지로
              </div>
            </div>
          </div>
        </div>

        {/* 화가 2 */}
        <div data-aos="flip-down">
          <div
            className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/${artists[1]?.userSeq}`)}
          >
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg font-bold mb-2">
                {artists[1]?.userNickname}
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                {artists[1]?.userDesc && artists[1].userDesc}
                {!artists[1]?.userDesc && "상태 메시지 없음"}
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center text-sm">
                화가 페이지로
              </div>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-sky-100 flex-shrink-0 drop-shadow-md">
              {artists[1]?.userImg && (
                <img
                  className="w-full h-full object-cover object-center rounded-full"
                  src={`http://j7d201.p.ssafy.io/api/my-file/read/${artists[1]?.userImg}`}
                  alt="userImg"
                />
              )}
            </div>
          </div>
        </div>

        {/* 화가 3 */}
        <div data-aos="flip-up">
          <div
            className="flex items-center lg:w-3/5 mx-auto p-8 mb-10 sm:flex-row flex-col bg-white rounded-xl drop-shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/mypage/${artists[2]?.userSeq}`)}
          >
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-sky-100 flex-shrink-0 drop-shadow-md">
              {artists[2]?.userImg && (
                <img
                  className="w-full h-full object-cover object-center rounded-full"
                  src={`http://j7d201.p.ssafy.io/api/my-file/read/${artists[2]?.userImg}`}
                  alt="userImg"
                />
              )}
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg font-bold mb-2">
                {artists[2]?.userNickname}
              </h2>
              <p className="leading-relaxed text-base text-gray-400">
                {artists[2]?.userDesc && artists[2].userDesc}
                {!artists[2]?.userDesc && "상태 메시지 없음"}
              </p>
              <div className="mt-3 text-sky-500 inline-flex items-center text-sm">
                화가 페이지로
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artists;
