import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { piecesApi } from "../../api/api";

import NavBar from "../../components/NavBar";

// const CARD_SIZE = 10;
// const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / CARD_SIZE);

// const DUMMY = new Array(20).fill(0).map(() => {
//   return {
//     title: Math.random().toString(),
//     content: Math.random().toString(),
//   };
// });

const Pieces = () => {
  const navigate = useNavigate();
  const [recentPieces, setRecentPieces] = useState([]);
  // const [popularPiecesList, setPopularPiecesList] = useState([]);

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchRecentPieces = useCallback(async () => {
    const { data } = await piecesApi.getPiecesRecent(page);
    console.log("data:", data);
    setRecentPieces((prevState) => [...prevState, ...data.pieceList]);
    setPage((prevState) => prevState + 1);
    // setNextPage();
    setIsFetching(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setIsFetching(true);
      }
    };
    setIsFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) {
      fetchRecentPieces();
    } else if (!hasNextPage) {
      setIsFetching(false);
    }
  }, [isFetching]);

  // useEffect(() => {
  //   const getRecentPiecesList = async () => {
  //     try {
  //       const res = await piecesApi.getPiecesRecent(1);
  //       console.log(res);
  //       setRecentPiecesList((prevState) => [
  //         ...prevState,
  //         ...res.data.pieceList,
  //       ]);
  //     } catch (error) {
  //       console.error("정신나갈거같애:", error);
  //     }
  //   };
  //   const getPopularPiecesList = async () => {
  //     try {
  //       const res = await piecesApi.getPiecesPopular(1);
  //       console.log(res);
  //       setPopularPiecesList((prevState) => [
  //         ...prevState,
  //         ...res.data.pieceList,
  //       ]);
  //     } catch (error) {
  //       console.error("정신나갈거같애:", error);
  //     }
  //   };
  //   getRecentPiecesList();
  //   getPopularPiecesList();
  // }, []);

  return (
    <React.Fragment>
      <NavBar />
      <section
        className="text-gray-600 body-font"
        style={{ marginTop: "71px" }}
      >
        <div className="pb-24 mx-auto">
          {/* 인트로 */}
          <section className="text-gray-600 body-font border-solid border-gray-50 border-b-2 bg-gray-50">
            <div className="container px-5 py-20 mx-auto">
              {/* 작품 목록 헤더 */}
              <div className="text-center mb-20">
                <h1 className="text-6xl font-medium title-font text-gray-900 mb-4">
                  작품 목록
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                  Art Horizon의 다양한 화가들의 작품들을 찾아보세요. 불후의 고전
                  명작들도 찾을 수 있습니다.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>

              {/* 검색 바 */}
              <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2 mb-20">
                <div className="mx-auto">
                  {/* 검색 */}
                  <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </span>
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-lg py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="찾고 싶은 것을 검색하세요"
                      type="text"
                      name="search"
                    />
                  </label>

                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    태그 이름
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    태그 이름
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    태그 이름
                  </button>
                </div>
              </section>

              {/* 작품 생성 버튼 */}
              <Link className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-gray-900/5 shadow-lg space-y-3 hover:bg-amber-400 hover:ring-amber-500 focus:ring-4 focus:bg-amber-500 focus:ring-amber-200 focus:text-white transition">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  ></svg>
                  <h3 className="text-gray-900 group-hover:text-white text-sm font-bold">
                    작품 전시
                  </h3>
                </div>
                <p className="text-gray-500 group-hover:text-white text-sm">
                  자신의 그림을 다른 사람들에게 보여주세요.
                </p>
              </Link>
            </div>
          </section>

          {/* 그림 리스트 */}
          {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1"> */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
            <div className="container px-5 py-48 mx-auto">
              {/* 헤더 */}
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                  최신 작품 목록
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                  누구나 화가가 될 수 있습니다. 그들의 잠재력을 발견하세요.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-amber-500 inline-flex"></div>
                </div>
              </div>
              {/* 그림 리스트 */}
              <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2">
                {recentPieces?.map((piece) => (
                  <div
                    key={Math.random().toString()}
                    className="shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer"
                    onClick={() => navigate(`${piece.pieceSeq}`)}
                  >
                    {/* 그림 */}
                    <div
                      className="absolute inset-0 bg-cover bg-center z-0"
                      style={{
                        backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
                      }}
                    ></div>

                    {/* 설명 */}
                    <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 ease-in-out duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center p-4">
                      <div className="text-2xl text-white font-semibold mb-6 text-center">
                        {piece.pieceTitle}
                      </div>
                      <div className="text-1xl text-white text-center">
                        {piece.pieceArtist}
                      </div>
                    </div>
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center rounded transition ease-in-out duration-300"
                      src={`http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}`}
                    />
                  </div>
                ))}

                {/* 로딩 엘리먼트 */}
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Pieces;

{
  /* <div
key={Math.random().toString()}
className="shadow-md rounded mb-2 drop-shadow-md overflow-hidden absolute top-0 left-0"
>
<img
  alt="gallery"
  className="w-full h-full object-cover object-center rounded hover:scale-125 hover:blur transition ease-in-out duration-300"
  // src={`https://source.unsplash.com/random/${parseInt(
  //   (Math.random() * (40 - 10) + 10) * 10
  // )}x${parseInt((Math.random() * (50 - 10) + 10) * 10)}`}
  src={`https://source.unsplash.com/random/${piece.pieceSeq}x${piece.pieceSeq}`}
/>
</div> */
}
