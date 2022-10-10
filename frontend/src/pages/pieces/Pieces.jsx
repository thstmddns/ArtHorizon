import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowDown, FaSpinner, FaSearch, FaHashtag } from "react-icons/fa";

import { piecesApi, searchApi } from "../../api/api";

import NavBar from "../../components/NavBar";

// const CARD_SIZE = 10;
// const PAGE_SIZE = 10 * Math.ceil(visualViewport.width / CARD_SIZE);

// const DUMMY = new Array(20).fill(0).map(() => {
//   return {
//     title: Math.random().toString(),
//     content: Math.random().toString(),
//   };
// });

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

const LOADING_ELEMENTS = [
  {
    id: Math.random().toString(),
  },
  {
    id: Math.random().toString(),
  },
  {
    id: Math.random().toString(),
  },
  {
    id: Math.random().toString(),
  },
];

const initialKeywordsState = [
  {
    id: 1,
    keywordName: "작품명",
    isSelected: false,
  },
  {
    id: 2,
    keywordName: "명화작가명",
    isSelected: false,
  },
  {
    id: 3,
    keywordName: "유저명",
    isSelected: false,
  },
  {
    id: 4,
    keywordName: "태그",
    isSelected: false,
  },
];

const Pieces = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recentPieces, setRecentPieces] = useState([]);
  // const [popularPiecesList, setPopularPiecesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const [keywords, setKeywords] = useState(initialKeywordsState);
  const [searchInput, setSearchInput] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");

  const [isSearched, setIsSearched] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const fetchRecentPieces = useCallback(async () => {
    // setIsLoading(true);
    // const { data } = await piecesApi.getPiecesRandom(page);
    const { data } = await piecesApi.getPiecesRecent(page);
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
      setTimeout(fetchRecentPieces, 2000);
      // fetchRecentPieces();
    } else if (!hasNextPage) {
      setIsFetching(false);
    }
  }, [isFetching, fetchRecentPieces, hasNextPage]);

  useEffect(() => {
    if (location.state?.tagKeyword) {
      setIsSearched(true);
      const searchData4 = JSON.stringify({
        tag: location.state.tagKeyword,
      });
      searchApi
        .searchTag(searchData4, 1)
        .then((res) => {
          console.log("res:", res);
          setSearchResults(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [location]);

  const selectKeywordHandler = (e, keywordId) => {
    setKeywords((prev) => {
      return [
        ...prev.map((item) => {
          if (keywordId === item.id) {
            setSelectedKeyword(item.keywordName);
          }
          return {
            id: item.id,
            keywordName: item.keywordName,
            isSelected: keywordId === item.id,
          };
        }),
      ];
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // navigate("/search", { state: { keyword: selectedKeyword, searchInput } });
    setIsSearched(true);
    setKeywords((prev) => {
      return [
        ...prev.map((item) => ({
          id: item.id,
          keywordName: item.keywordName,
          isSelected: false,
        })),
      ];
    });
    setSearchInput("");

    switch (selectedKeyword) {
      case "작품명":
        console.log("작품명");
        const searchData1 = JSON.stringify({
          pieceTitle: searchInput,
        });
        searchApi
          .searchPiece(searchData1, 1)
          .then((res) => {
            console.log("res:", res);
            setSearchResults(res.data);
            console.log("searchResults:", searchResults);
          })
          .catch((err) => console.error(err));
        break;
      case "명화작가명":
        console.log("명화작가명");
        const searchData2 = JSON.stringify({
          artistName: searchInput,
        });
        searchApi
          .searchArtist(searchData2, 1)
          .then((res) => {
            console.log("res:", res);
            setSearchResults(res.data);
          })
          .catch((err) => console.error(err));
        break;
      case "유저명":
        console.log("유저명");
        const searchData3 = JSON.stringify({
          userNickname: searchInput,
        });
        searchApi
          .searchUser(searchData3, 1)
          .then((res) => {
            console.log("res:", res);
            setSearchResults(res.data);
          })
          .catch((err) => console.error(err));
        break;
      case "태그":
        console.log("태그");
        const searchData4 = JSON.stringify({
          tag: searchInput,
        });
        searchApi
          .searchTag(searchData4, 1)
          .then((res) => {
            console.log("res:", res);
            setSearchResults(res.data);
          })
          .catch((err) => console.error(err));
        break;
      default:
        break;
    }
  };

  const handleClickNavigate = (e, piece) => {
    if (selectedKeyword === "유저명") {
      navigate(`/mypage/${piece.userSeq}`);
    } else {
      navigate(`${piece.pieceSeq}`);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <section className="" style={{ marginTop: "71px" }}>
        <div className="py-64 mx-auto">
          {/* 인트로 */}
          <section className="border-solid border-gray-50 border-b-2">
            <div className="container mx-auto">
              {/* 작품 목록 헤더 */}
              {!isSearched && (
                <div className="text-center mb-20">
                  <h1
                    className="text-6xl font-medium title-font text-gray-900 mb-4"
                    data-aos="fade-down"
                  >
                    작품 목록
                  </h1>
                  <p
                    className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
                    data-aos="fade-in"
                  >
                    Art Horizon의 다양한 화가들의 작품들을 찾아보세요. 불후의
                    고전 명작들도 찾을 수 있습니다.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                  </div>
                </div>
              )}

              {/* 검색 결과 헤더 */}
              {isSearched && (
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
                    해당 키워드로 검색한 결과입니다.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                  </div>
                </div>
              )}

              {/* 검색 바 */}
              <section className="text-gray-600 body-font mb-10">
                <div className="mx-auto xl:w-2/4 lg:w-3/4">
                  {/* 검색 고르는 것들 */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex">
                      {keywords?.map((keyword) => (
                        <div key={keyword.id} data-aos="flip-up">
                          <div
                            className={`flex px-4 py-3 mr-4 rounded-lg hover:drop-shadow-md border-solid border border-gray-200 bg-white cursor-pointer hover:bg-sky-300 hover:text-white focus:ring focus:ring-sky-500 transition ${
                              keyword.isSelected &&
                              " text-white bg-sky-300 hover:bg-white hover:text-sky-500"
                            }`}
                            onClick={(e) => selectKeywordHandler(e, keyword.id)}
                          >
                            {keyword.keywordName}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Link to="/register" data-aos="fade-up">
                        <div className="block text-white rounded-lg px-6 py-3 bg-amber-400 hover:drop-shadow-md space-y-3 hover:bg-amber-300 hover:ring-amber-400 focus:ring-4 focus:bg-amber-300 focus:ring-amber-400 transition">
                          나의 작품 등록
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* 검색 */}
                  <form method="post" onSubmit={submitHandler}>
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
                      <div className="flex">
                        <input
                          className="placeholder:italic placeholder:text-gray-300 block bg-white w-full border border-slate-300 rounded-l-lg py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-amber-500 focus:ring-amber-500 focus:ring-1 sm:text-sm"
                          placeholder="검색어를 입력하세요"
                          type="text"
                          name="search"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                          type="button"
                          className="text-white border border-amber-300 bg-amber-400 px-8 rounded-r-lg text-lg hover:bg-amber-500 focus:bg-amber-600 focus:ring-4 focus:ring-amber-200 transition"
                          onClick={submitHandler}
                        >
                          <FaSearch fill="white" />
                        </button>
                      </div>
                    </label>
                  </form>
                </div>
              </section>
            </div>
          </section>

          {/* 그림 리스트 */}
          {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1"> */}
          {!isSearched && (
            <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
              <div className="container px-5 py-48 mx-auto mb-16">
                {/* 헤더 */}
                <div
                  className="flex flex-col text-center w-full mb-20"
                  data-aos="fade-up"
                >
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
                {/* <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2"> */}
                <div className="grid gap-2 grid-cols-4">
                  {recentPieces?.map((piece) => (
                    <div
                      key={piece.pieceSeq}
                      className={`shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer`}
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
                  {isLoading && (
                    <React.Fragment>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
                    </React.Fragment>
                  )}
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
          )}

          {/* 검색 결과 리스트 */}
          {isSearched && searchResults?.length > 0 && (
            <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
              <div className="container px-5 py-48 mx-auto mb-16">
                {/* 검색 결과 헤더 */}
                <div
                  className="flex flex-col text-center w-full mb-20"
                  data-aos="fade-up"
                >
                  <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                    검색 결과 목록
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500"></p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-16 h-1 rounded-full bg-amber-500 inline-flex"></div>
                  </div>
                </div>

                {/* 그림 리스트 */}
                {/* <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2"> */}
                <div className="grid gap-2 grid-cols-4">
                  {searchResults?.map((piece) => (
                    <div
                      key={piece.pieceSeq ?? piece.userImg}
                      className={`shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer`}
                      onClick={(e) => handleClickNavigate(e, piece)}
                    >
                      {/* 그림 */}
                      <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{
                          backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${
                            piece.pieceImg ?? piece.userImg
                          }')`,
                        }}
                      ></div>

                      {/* 설명 */}
                      <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 ease-in-out duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center p-4">
                        <div className="text-2xl text-white font-semibold mb-6 text-center">
                          {piece.pieceTitle ?? piece.userDesc}
                        </div>
                        <div className="text-1xl text-white text-center">
                          {piece.pieceArtist ?? piece.userNickname}
                        </div>
                      </div>
                      <img
                        alt="img"
                        className="w-full h-full object-cover object-center rounded transition ease-in-out duration-300"
                        src={`http://j7d201.p.ssafy.io/api/my-file/read/${
                          piece.pieceImg ?? piece.userImg
                        }`}
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
          )}

          {isSearched && searchResults && searchResults?.length === 0 && (
            <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2">
              <div className="container px-5 py-48 mx-auto mb-16">
                {/* 헤더 */}
                <div
                  className="flex flex-col text-center w-full mb-20"
                  data-aos="fade-up"
                >
                  <h1 className="text-3xl font-medium title-font mb-4 text-gray-900">
                    검색 결과가 없습니다.
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500"></p>
                  <div className="flex mt-6 justify-center">
                    <div className="w-16 h-1 rounded-full bg-amber-500 inline-flex"></div>
                  </div>
                </div>

                {/* 그림 리스트 */}
                <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2">
                  <div
                    className={`shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer ${
                      isLoading && "animate-pulse"
                    }`}
                  >
                    검색 결과가 없습니다.
                  </div>
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
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Pieces;

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
