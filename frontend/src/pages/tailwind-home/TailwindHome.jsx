import React from "react";
import { Link } from "react-router-dom";

import TailwindNavBar from "../../components/TailwindNavBar";
import TailwindFooter from "../../components/TailwindFooter";

const tagItems = new Array(12).fill(0).map(() => {
  return { tagName: Math.random().toString(36).substring(2, 12) };
});

// style={{
//   backgroundImage: "url(https://source.unsplash.com/1920x1080)",
// }}

// style={{
//   backgroundImage: "url(https://picsum.photos/1920/1080/?blur=10​)",
// }}

const TailwindHome = () => {
  return (
    <React.Fragment>
      <TailwindNavBar />
      <section className="text-gray-600 body-font">
        <div className="pb-24 mx-auto">
          {/* 인트로 */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
            <div className="container px-5 py-64 mx-auto">
              {/* 스타일 트랜스퍼 헤더 */}
              <div className="text-center mb-20">
                <h1 className="text-9xl font-medium title-font text-gray-900 mb-4">
                  Art Horizon
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                  첨엔 혼자라는게 편했지 자유로운 선택과 시간에 너의 기억을 지운
                  듯 했어 정말 난 그런줄로 믿었어 하지만 말야 이른 아침 혼자
                  눈을 뜰때 내 곁에 니가 없다는 사실을 알게 될 때면 나도 모를
                  눈물이 흘러 변한 건 없니 날 웃게 했던 예전 그 말투도 여전히
                  그대로니 난 달라졌어 예전만큼 웃질 않고 좀 야위었어 널
                  만날때보다 나를 이해해준 지난 날을 너의 구속이라 착각했지
                  남자다운 거라며 너에겐 사랑한단 말조차 못했어 하지만 말야 빈
                  종이에 가득 너의 이름 쓰면서
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>

              <button className="flex mx-auto mt-16 text-white bg-sky-500 border-0 py-4 px-12 focus:outline-none hover:bg-sky-600 active:bg-sky-700 focus:ring focus:ring-sky-300 rounded text-xl font-bold">
                원하는 그림 검색하기
              </button>
            </div>
          </section>

          {/* 태그 소개 */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2 bg-slate-100">
            <div className="container py-48 mx-auto">
              {/* 태그 소개 헤더 */}
              <div className="flex flex-wrap w-full mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    작품 추천 태그
                  </h1>
                  <div className="h-1 w-20 bg-sky-400 rounded"></div>
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                  Art Horizon의 AI가 자사 데이터베이스의 작품을 분석하고, 태그와
                  통계를 생성한 것을 바탕으로 태그를 추천합니다. 신기한 태그의
                  맛을 보세요.
                </p>
              </div>
              <div className="flex flex-wrap -m-4">
                {/* 태그 아이템 */}
                {tagItems.map((item) => (
                  <div
                    key={Math.random().toString()}
                    className="p-4 xl:w-1/6 md:w-1/4 sm:w-1/3 drop-shadow-md transition ease-in-out hover:-translate-y-6 duration-200"
                  >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-gray-50 rounded-lg">
                      <img
                        className="lg:h-64 md:h-48 w-full object-cover object-center"
                        src={`https://source.unsplash.com/${parseInt(
                          Math.random() * 100 * 5
                        )}x${parseInt(Math.random() * 100 * 5)}`}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-sky-400 mb-1">
                          TAG
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {item.tagName}
                        </h1>
                        <p className="leading-relaxed mb-3">태그이다</p>
                        <div className="flex items-center flex-wrap ">
                          <Link className="text-sky-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Learn More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 태그 아이템 */}
                {/* <div className="xl:w-1/4 md:w-1/2 p-4 drop-shadow-md transition ease-in-out hover:-translate-y-6 duration-200">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-48 rounded w-full object-cover object-center mb-6"
                      src="https://source.unsplash.com/502x502"
                      alt="content"
                    />
                    <h3 className="tracking-widest text-sky-500 text-xs font-medium title-font">
                      SUBTITLE
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      천안 병천순대
                    </h2>
                    <p className="leading-relaxed text-base h-32 text-ellipsis overflow-hidden">
                      I'm counting stars (stars) 밤하늘에 펄 (let it try) Better
                      than your 루이비통 Your 루이비통 (back to count) I'm
                      counting stars, stars 밤하늘에 펄 (let it try) Better than
                      your 루이비통 Your 루이비통 (count it, back to back, ayy)
                      Back to back, back to back, ayy Back to back, rest, rest,
                      ayy Back to back, hmm, back to back, come on Back to back,
                      hmm, counting that, ayy
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </section>

          {/* 화가 소개 */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
            <div className="container py-48 mx-auto">
              {/* 화가 소개 헤더 */}
              <div className="flex flex-wrap w-full mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    화가 소개
                  </h1>
                  <div className="h-1 w-20 bg-sky-400 rounded"></div>
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                  Art Horizon에서는 누구나 화가가 될 수 있고, 관람객이 될 수
                  있습니다. 버튼 클릭 한 번으로 손쉽게 화가로 전환할 수 있고,
                  본인의 작품을 올려 다른 사람들에게 즐거움을 줄 수 있습니다.
                  화가를 찾아보세요.
                </p>
              </div>
              {/* 화가 아이템 */}
              <div className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-gray-100 rounded-lg drop-shadow-md">
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
                    함희주
                  </h2>
                  <p className="leading-relaxed text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast
                    vegan taxidermy. Gastropub indxgo juice poutine.
                  </p>
                  <Link className="mt-3 text-sky-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              {/* 화가 아이템 */}
              <div className="flex items-center lg:w-3/5 mx-auto border-b p-8 mb-10 border-gray-200 sm:flex-row flex-col bg-gray-100 rounded-lg drop-shadow-md">
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                    이주영
                  </h2>
                  <p className="leading-relaxed text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast
                    vegan taxidermy. Gastropub indxgo juice poutine.
                  </p>
                  <Link className="mt-3 text-sky-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
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
              {/* 화가 아이템 */}
              <div className="flex items-center lg:w-3/5 mx-auto p-8 mb-10 sm:flex-row flex-col bg-gray-100 rounded-lg drop-shadow-md">
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
                    손승운
                  </h2>
                  <p className="leading-relaxed text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast
                    vegan taxidermy. Gastropub indxgo juice poutine.
                  </p>
                  <Link className="mt-3 text-sky-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 스타일 트랜스퍼 */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2 bg-slate-100">
            <div className="container px-5 py-48 mx-auto">
              {/* 스타일 트랜스퍼 헤더 */}
              <div className="text-center mb-20">
                <h1 className="text-3xl font-medium title-font text-gray-900 mb-4">
                  스타일 트랜스퍼
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                  마음에 드는 사진이 있으신가요? 남들과는 다른 것을 원하시나요?
                  그 사진을 그림의 스타일로 바꿔 드립니다. 무료로 지금 바로
                  시작하세요.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>
              <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                {/* 아이템 */}
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                  <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-sky-200 text-indigo-500 mb-5 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
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
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      화풍
                    </h2>
                    <p className="leading-relaxed text-base">
                      Blue bottle crucifix vinyl post-ironic four dollar toast
                      vegan taxidermy. Gastropub indxgo juice poutine, ramps
                      microdosing banh mi pug VHS try-hard.
                    </p>
                    <Link className="mt-3 text-sky-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* 아이템 */}
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                  <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-sky-200 text-indigo-500 mb-5 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
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
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      사물
                    </h2>
                    <p className="leading-relaxed text-base">
                      Blue bottle crucifix vinyl post-ironic four dollar toast
                      vegan taxidermy. Gastropub indxgo juice poutine, ramps
                      microdosing banh mi pug VHS try-hard.
                    </p>
                    <Link className="mt-3 text-sky-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* 아이템 */}
                <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                  <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-sky-200 text-indigo-500 mb-5 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
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
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      인물
                    </h2>
                    <p className="leading-relaxed text-base">
                      Blue bottle crucifix vinyl post-ironic four dollar toast
                      vegan taxidermy. Gastropub indxgo juice poutine, ramps
                      microdosing banh mi pug VHS try-hard.
                    </p>
                    <Link className="mt-3 text-sky-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <button className="flex mx-auto mt-16 text-white bg-sky-500 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 active:bg-sky-700 focus:ring focus:ring-sky-300 rounded text-lg">
                지금 바로 시작하기!
              </button>
            </div>
          </section>

          {/* 후기 */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
            <div className="container px-5 py-48 mx-auto">
              {/* 헤더 */}
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                  후기
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                  자신만의 개성으로 무장한 신인 화가들의 작품을 만나보세요.
                  그들과 소통하고 공감하세요. 오직 Art Horizon 에서만
                  가능합니다.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>
              <div className="flex flex-wrap -m-4">
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      아트 호라이즌은 신이다아트 호라이즌은 신이다아트
                      호라이즌은 신이다아트 호라이즌은 신이다아트 호라이즌은
                      신이다아트 호라이즌은 신이다아트 호라이즌은 신이다아트
                      호라이즌은 신이다
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/106x106"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          Holden Caulfield
                        </span>
                        <span className="text-gray-500 text-sm">
                          UI DEVELOPER
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      달리 반 피카소 달리 반 피카소 달리 반 피카소 달리 반
                      피카소 달리 반 피카소 달리 반 피카소 달리 반 피카소 달리
                      반 피카소 달리 반 피카소 달리 반 피카소 달리 반 피카소
                      달리 반 피카소 달리 반 피카소
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/107x107"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      예술을 이해할 수 있었다 예술을 이해할 수 있었다 예술을
                      이해할 수 있었다 예술을 이해할 수 있었다 예술을 이해할 수
                      있었다 예술을 이해할 수 있었다 예술을 이해할 수 있었다
                      예술을 이해할 수 있었다 예술을
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/107x107"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/107x107"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      프론트도 사람이야 사람 !! 프론트도 사람이야 사람 !!
                      프론트도 사람이야 사람 !! 프론트도 사람이야 사람 !!
                      프론트도 사람이야 사람 !! 프론트도 사람이야 사람 !!
                      프론트도 사람이야 사람 !! 프론트도 사람이야 사람 !!
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/107x107"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* 후기 아이템 */}
                <div className="p-4 lg:w-1/3 md:w-1/2 w-full drop-shadow-md transition ease-in-out hover:scale-105 duration-200">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-gray-400 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                    </p>
                    <Link className="inline-flex items-center">
                      <img
                        alt="testimonial"
                        src="https://dummyimage.com/107x107"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          김박사
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <TailwindFooter />
      </section>
    </React.Fragment>
  );
};

export default TailwindHome;
