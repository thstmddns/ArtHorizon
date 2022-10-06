import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowDown, FaSpinner, FaHashtag } from "react-icons/fa";

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

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [recentPieces, setRecentPieces] = useState([]);
  // const [popularPiecesList, setPopularPiecesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // 검색 타입
  const [type, setType] = useState("");
  // 검색 단어
  const [search, setSerach] = useState("");

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  // const [keywords, setKeywords] = useState([
  //   {
  //     id: 1,
  //     keywordName: "작품명",
  //     isSelected: false,
  //   },
  //   {
  //     id: 2,
  //     keywordName: "명화작가명",
  //     isSelected: false,
  //   },
  //   {
  //     id: 3,
  //     keywordName: "유저명",
  //     isSelected: false,
  //   },
  //   {
  //     id: 4,
  //     keywordName: "태그",
  //     isSelected: false,
  //   },
  // ]);
  // const [searchInput, setSearchInput] = useState("");
  // const [selectedKeyword, setSelectedKeyword] = useState("");

  const { keyword, searchInput } = location.state;

  useEffect(() => {
    console.log("hello from search.jsx");
    console.log("keyword:", keyword);
    console.log("searchInput:", searchInput);
  }, []);

  const fetchRecentPieces = useCallback(async () => {
    // setIsLoading(true);
    const { data } = await piecesApi.getPiecesRandom(page);
    // const { data } = await piecesApi.getPiecesRecent(page);
    console.log("data:", data);
    setRecentPieces((prevState) => [...prevState, ...data.pieceList]);
    if (page + 1 > data.totalPage) {
      setNextPage(false);
      setIsLoading(false);
    }
    setPage((prevState) => prevState + 1);
    // setNextPage();
    setIsFetching(false);
    setIsLoading(false);
  }, [page]);

  // // 무한스크롤
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, offsetHeight } = document.documentElement;
  //     if (window.innerHeight + scrollTop >= offsetHeight) {
  //       setIsFetching(true);
  //     }
  //   };
  //   setIsFetching(true);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  // useEffect(() => {
  //   if (isFetching && hasNextPage) {
  //     fetchRecentPieces();
  //     // fetchRandomPieces();
  //   } else if (!hasNextPage) {
  //     setIsFetching(false);
  //   }
  // }, [isFetching, fetchRecentPieces, hasNextPage]);

  // 무한스크롤
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
      setIsLoading(true);
      setTimeout(fetchRecentPieces, 1000);
      // fetchRecentPieces();
    } else if (!hasNextPage) {
      setIsFetching(false);
    }
  }, [isFetching, fetchRecentPieces, hasNextPage]);

  // 검색 태그 설정
  const columnChange = (type) => {
    // console.log(type);
    setType(type);
  };

  // 검색 단어 설정
  const changeText = (text) => {
    // console.log(text);
    setSerach(text);
  };

  // 검색 시도
  const enterkey = (key) => {
    if (key === "Enter") {
      // console.log("yes");
      navigate(`/pieces/search/${search}`, {
        state: {
          type: type,
          search: search,
        },
      });
    }
  };

  // const selectKeywordHandler = (e, keywordId) => {
  //   console.log("keywordId:", keywordId);
  //   setKeywords((prev) => {
  //     return [
  //       ...prev.map((item) => {
  //         if (keywordId === item.id) {
  //           setSelectedKeyword(item.keywordName);
  //         }
  //         return {
  //           id: item.id,
  //           keywordName: item.keywordName,
  //           isSelected: keywordId === item.id,
  //         };
  //       }),
  //     ];
  //   });
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("submit");
  //   console.log("selectedKeyword:", selectedKeyword);
  //   console.log("searchInput:", searchInput);
  //   navigate("/search");
  // };

  return (
    <React.Fragment>
      <NavBar />
      <section className="" style={{ marginTop: "71px" }}>
        <div className="py-64 mx-auto">
          {/* 인트로 */}
          <section className="border-solid border-gray-50 border-b-2">
            <div className="container mx-auto">
              {/* 작품 목록 헤더 */}
              <div className="text-center mb-20">
                <h1
                  className="text-6xl font-medium title-font text-gray-900 mb-4"
                  data-aos="fade-down"
                >
                  검색 결과
                </h1>
                <p
                  className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
                  data-aos="fade-in"
                >
                  Art Horizon의 다양한 화가들의 작품들을 찾아보세요. 불후의 고전
                  명작들도 찾을 수 있습니다.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>

              {/* 검색 바 */}
              <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2 mb-10">
                <div className="mx-auto xl:w-2/4 lg:w-3/4">
                  {/* 검색 */}
                  {/* <form method="post" onSubmit={submitHandler}>
                    <label className="relative block mb-4" data-aos="zoom-in">
                      <span className="sr-only">Search</span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
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
                        className="placeholder:italic placeholder:text-gray-300 block bg-white w-full border border-slate-300 rounded-lg py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-amber-500 focus:ring-amber-500 focus:ring-1 sm:text-sm"
                        placeholder="검색어를 입력하세요"
                        type="text"
                        name="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </label>
                  </form> */}

                  {/* 검색 고르는 것들 */}
                  {/* <div className="flex pb-8 border-solid border-b border-gray-100 mb-8">
                    {keywords?.map((keyword) => (
                      <div key={keyword.id} data-aos="flip-up">
                        <div
                          className={`flex px-4 py-3 mr-4 rounded-lg drop-shadow-md border-solid border border-gray-200 bg-white cursor-pointer hover:bg-sky-300 hover:text-white transition ${
                            keyword.isSelected &&
                            " text-white bg-sky-300 hover:bg-white hover:text-sky-500"
                          }`}
                          onClick={(e) => selectKeywordHandler(e, keyword.id)}
                        >
                          {keyword.keywordName}
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              </section>

              {/* 작품 생성 버튼 */}
              <Link
                to="/register"
                className="block max-w-xs mx-auto rounded-lg p-6 bg-amber-400 drop-shadow-md space-y-3 hover:bg-amber-300 hover:ring-amber-400 focus:ring-4 focus:bg-amber-300 focus:ring-amber-400 transition"
                data-aos="fade-up"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  ></svg>
                  <h3 className="text-white text font-bold">작품 전시</h3>
                </div>
                <p className="text-white text-sm">
                  자신의 그림을 다른 사람들에게 보여주세요.
                </p>
              </Link>
            </div>
          </section>

          {/* 그림 리스트 */}
          {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1"> */}
          <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
            <div className="container px-5 py-48 mx-auto mb-16">
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
                    className={`shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer ${
                      isLoading && "animate-pulse"
                    }`}
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
              </div>

              {/* 로딩 완료 */}
              {!isLoading && (
                <div className="flex justify-center items-center mt-20">
                  <FaArrowDown
                    fill="#38bdf8"
                    className="animate-bounce"
                    style={{
                      color: "#38bdf8 !important",
                      width: "5rem",
                      height: "5rem",
                    }}
                  />
                  {/* <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-sky-300"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-sky-400"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-sky-500"></div>
                  </div> */}
                </div>
              )}

              {/* 로딩중 */}
              {isLoading && (
                <div className="bg-white h-56">
                  <div className="flex justify-center items-center mt-20">
                    {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin text-sky-300"></div> */}
                    <FaSpinner
                      fill="#38bdf8"
                      className="animate-spin w-16 h-16"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Search;

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

// {/* 그림 리스트 */}
// <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2">
//   {recentPieces?.map((piece) => (
//     <div
//       key={Math.random().toString()}
//       className="shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer"
//       onClick={() => navigate(`${piece.pieceSeq}`)}
//     >
//       {/* 그림 */}
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{
//           backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
//         }}
//       ></div>

//       {/* 설명 */}
//       <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 ease-in-out duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center p-4">
//         <div className="text-2xl text-white font-semibold mb-6 text-center">
//           {piece.pieceTitle}
//         </div>
//         <div className="text-1xl text-white text-center">
//           {piece.pieceArtist}
//         </div>
//       </div>
//       <img
//         alt="gallery"
//         className="w-full h-full object-cover object-center rounded transition ease-in-out duration-300"
//         src={`http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}`}
//       />
//     </div>
//   ))}

//   {/* 로딩 엘리먼트 */}
//   <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
//     <div className="animate-pulse flex space-x-4">
//       <div className="rounded-full bg-slate-200 h-10 w-10"></div>
//       <div className="flex-1 space-y-6 py-1">
//         <div className="h-2 bg-slate-200 rounded"></div>
//         <div className="space-y-3">
//           <div className="grid grid-cols-3 gap-4">
//             <div className="h-2 bg-slate-200 rounded col-span-2"></div>
//             <div className="h-2 bg-slate-200 rounded col-span-1"></div>
//           </div>
//           <div className="h-2 bg-slate-200 rounded"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
