import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { IoArrowDown } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Searchpieces = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getType = location.state.type;
  const getSearch = location.state.search;
  console.log(getType);

  //검색한 타입
  const [tryType, setTryType] = useState(getType);
  //검색한 단어
  const [trySearch, setTrySearch] = useState(getSearch);

  // 검색할 타입
  const [type, setType] = useState("");
  // 검색할 단어
  const [search, setSerach] = useState("");

  const [page, setPage] = useState(1);
  const [searchPieces, setSearchPieces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [changeSearch, setChangeSerach] = useState(true);

  let showType = "";
  if (tryType === "pieces") {
    showType = "작품명";
  } else if (tryType === "artists") {
    showType = "명화작가명";
  } else if (tryType === "users") {
    showType = "유저작가명";
  } else {
    showType = "태그";
  }

  const fetchSearchPieces = useCallback(() => {
    const url = `http://j7d201.p.ssafy.io/api/search/${tryType}?page=${page}`;
    let data = JSON.stringify({});
    if (tryType === "pieces") {
      data = JSON.stringify({
        pieceTitle: trySearch,
      });
    } else if (tryType === "artists") {
      data = JSON.stringify({
        artistName: trySearch,
      });
    } else if (tryType === "users") {
      data = JSON.stringify({
        userNickname: trySearch,
      });
    } else {
      data = JSON.stringify({
        tag: trySearch,
      });
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    // console.log(url, data, config);
    axios
      .post(url, data, config)
      .then((res) => {
        // console.log("get it", res.data);
        const result = res.data;
        if (page + 1 > res.data.totalPage) {
          setNextPage(false);
          setIsLoading(false);
        }
        setPage((prevState) => prevState + 1);
        setSearchPieces((prevState) => [...prevState, ...result.pieceList]);
      })
      .catch((err) => console.error("get error", err));
  }, [page, trySearch, tryType]);

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
      setTimeout(fetchSearchPieces, 1000);
    } else if (!hasNextPage) {
      setIsFetching(false);
    }
  }, [isFetching, fetchSearchPieces, hasNextPage, changeSearch]);

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
  const enterkey = async (key) => {
    if (key === "Enter") {
      // 방법 두 개
      // 1. 이 페이지를 유지한 상태에서 searchPieces, page를 초기화한 후 다시 fetchSearchPieces를 작동시킨다.
      setSearchPieces(() => []);
      setPage(() => 1);
      setTryType(() => type);
      setTrySearch(() => search);
      // 2. navigate를 이용해 state을 새로 업데이트 한 후 새 페이지를 유도한다.
      navigate(`/pieces/search/${search}`, {
        state: {
          type: type,
          search: search,
        },
        replace: false,
      });
      window.location.reload();
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
              <div className="text-center mb-20">
                <h1
                  className="text-6xl font-medium title-font text-gray-900 mb-4"
                  data-aos="fade-down"
                >
                  검색 목록
                </h1>
                <p
                  className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
                  data-aos="fade-in"
                >
                  <strong className="font-bold">
                    {showType} {trySearch}
                  </strong>
                  에 대한 검색결과입니다.
                </p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
                </div>
              </div>

              {/* 검색 바 */}
              <section className="text-gray-600 body-font border-solid border-gray-100 border-b-2 mb-10">
                <div className="mx-auto xl:w-2/4 lg:w-3/4">
                  {/* 검색 */}
                  <label className="relative block" data-aos="zoom-in">
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
                      placeholder="찾고 싶은 것을 검색하세요"
                      type="text"
                      name="search"
                      onChange={(e) => changeText(e.target.value)}
                      onKeyUp={(e) => enterkey(e.key)}
                    />
                  </label>

                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    data-aos="flip-up"
                    onClick={() => columnChange("pieces")}
                  >
                    작품명
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    data-aos="flip-up"
                    onClick={() => columnChange("artists")}
                  >
                    명화작가명
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    data-aos="flip-up"
                    onClick={() => columnChange("users")}
                  >
                    유저명
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    data-aos="flip-up"
                    onClick={() => columnChange("tags")}
                  >
                    태그
                  </button>
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
                {searchPieces?.map((piece) => (
                  <div
                    key={Math.random().toString()}
                    className={`shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer ${
                      isLoading && "animate-pulse"
                    }`}
                    onClick={() => navigate(`/pieces/${piece.pieceSeq}`)}
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
              {(isLoading || hasNextPage) && (
                <div className="flex justify-center items-center mt-20">
                  <IoArrowDown
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
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin text-sky-300"></div>
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

export default Searchpieces;
