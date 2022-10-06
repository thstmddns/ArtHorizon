import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { piecesApi } from "../../../api/api";

// style={{
//   backgroundImage: "url(https://source.unsplash.com/1920x1080)",
// }}

// style={{
//   backgroundImage: "url(https://picsum.photos/1920/1080/?blur=10​)",
// }}

// const tagItems = new Array(8).fill(0).map(() => {
//   return { tagName: Math.random().toString(36).substring(2, 12) };
// });

const Tags = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const res = await piecesApi.getMainTags();
      setTags(res.data);
    };
    fetchTags();
  }, []);

  return (
    <section className="text-gray-600 body-font border-solid border-gray-50 border-b-2 bg-gray-50">
      <div className="container py-48 mx-auto">
        {/* 태그 소개 헤더 */}
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              data-aos="fade-right"
            >
              작품 추천 태그
            </h1>
            <div className="h-1 w-20 bg-sky-300 rounded"></div>
          </div>
          <p
            className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-right"
            data-aos="fade-left"
          >
            Art Horizon의 AI가 자사 데이터베이스의 작품을 분석하고, <br />
            해당 결과를 바탕으로 태그를 추천합니다. Art Horizon의 특별한 태그를
            경험하세요.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {/* 태그 아이템 */}
          {tags.map((tag) => (
            <div
              key={tag.tagSeq}
              className="p-4 xl:w-1/4 md:w-1/2 sm:w-1/2 drop-shadow-md transition ease-in-out hover:-translate-y-6 duration-200 cursor-pointer"
              // 태그 클릭시 검색 결과 화면 이동
              onClick={() =>
                navigate(`/pieces`, {
                  state: {
                    tagKeyword: tag.tagTitle,
                  },
                })
              }
              data-aos="flip-down"
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white rounded-lg">
                <img
                  className="lg:h-64 md:h-48 w-full object-cover object-center"
                  src={`http://j7d201.p.ssafy.io/api/my-file/read/${tag.tagImg}`}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-amber-400 mb-1">
                    TAG
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-700 mb-3 text-xl font-bold">
                    {tag.tagTitle}
                  </h1>
                  <p className="leading-relaxed mb-3 text-gray-400">
                    {tag.tagDesc}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <div className="text-sky-500 inline-flex items-center md:mb-2 lg:mb-0">
                      태그 보기
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tags;
