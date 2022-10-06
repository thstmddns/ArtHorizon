import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authApi, piecesApi } from "../../api/api";

import { FaBookmark, FaRegBookmark, FaHashtag, FaList } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

import NavBarDark from "../../components/NavBarDark";

const Piece = () => {
  const { pieceSeq } = useParams();
  const navigate = useNavigate();
  const [piece, setPiece] = useState();
  const [cinema, setCinema] = useState(false);

  useEffect(() => {
    piecesApi
      .getPieceDetail(pieceSeq)
      .then((res) => setPiece(res.data))
      .catch(() => toast.error("작품 불러오기 오류"));
  }, [pieceSeq]);

  // 북마크 설정하기
  const setBookmark = () => {
    authApi
      .setBookmark(pieceSeq)
      .then(() => {
        piecesApi
          .getPieceDetail(pieceSeq)
          .then((res) => setPiece(res.data))
          .catch(() => toast.error("작품 불러오기 오류"));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info("로그인이 필요합니다");
          navigate("/login");
        } else {
          toast.error("북마크 오류");
        }
      });
  };

  // 북마크 해제하기
  const cancelBookmark = () => {
    authApi
      .deleteBookmark(pieceSeq)
      .then(() => {
        piecesApi
          .getPieceDetail(pieceSeq)
          .then((res) => setPiece(res.data))
          .catch(() => toast.error("작품 불러오기 오류"));
      })
      .catch(() => toast.error("북마크 해제 오류"));
  };

  const paymentHandler = () => {
    toast.info("결제를 진행합니다");
  };

  return (
    <React.Fragment>
      {!cinema && <NavBarDark />}
      <section
        className="text-gray-600 body-font relative bg-gray-800"
        // style={{ marginTop: "71px" }}
        style={{ marginTop: cinema ? "0" : "7vh" }}
      >
        {/* 블러 배경 */}
        {!cinema && piece && (
          <div
            className="mx-auto flex justify-center items-center bg-cover bg-center opacity-30 blur"
            style={{
              backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
              // height: "1009px",
              height: "93vh",
              // height: "92.95vh",
              width: "100vw",
            }}
            data-aos="fade-in"
          ></div>
        )}

        {/* 명화 그림, 정보 */}
        {!cinema && piece && piece.pieceType === "M" && (
          <div
            className="mx-auto flex justify-center items-center absolute top-0 left-0"
            style={{
              // backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
              // height: "1009px",
              height: "93vh",
              // height: "92.95vh",
              width: "100vw",
            }}
          >
            <div className="flex">
              {/* 이미지 */}
              <img
                alt="gallery"
                className="object-contain rounded drop-shadow-md mr-8 cursor-pointer hover:opacity-80 transition"
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}`}
                style={{ maxWidth: "73vw", maxHeight: "90vh" }}
                onClick={() => setCinema(true)}
                data-aos="zoom-out"
              />

              {/* 설명 */}
              <div
                className="flex flex-col justify-between backdrop-blur-sm p-4"
                // style={{ width: "23vw", maxHeight: "90vh" }}
                data-aos="fade-left"
              >
                {/* 내용 */}
                <div className="flex flex-col">
                  <div
                    className="text-white mb-2 font-bold text-3xl"
                    style={{ lineHeight: "1" }}
                  >
                    {piece.pieceTitleKr}
                  </div>
                  <div className="text-white mb-4 font-bold text-xl">
                    {piece.pieceArtistKr}
                  </div>
                  <div className="text-white text-lg">
                    {piece.pieceCentury} C &ndash; {piece.pieceYear}
                  </div>
                  <div className="text-white text-lg">{piece.pieceGenre}</div>
                  <div className="text-white text-lg mb-4">
                    {piece.pieceStyle}
                  </div>
                  <div className="flex mb-4">
                    <div className="flex items-center text-white text-lg font-bold bg-gray-900 rounded-lg drop-shadow-md px-2 py-1 cursor-pointer hover:scale-105 transition">
                      <FaHashtag fill="white" className="mr-1" />{" "}
                      <div className="text-white text-lg font-bold">
                        {piece.pieceScent}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-white text-lg">
                    태그: {piece.pieceTag} ..
                  </div> */}
                </div>

                {/* 버튼 */}
                <div className="flex justify-between mb-2">
                  <div>
                    {piece.pieceBookmarkYn === "Y" && (
                      <button
                        className="flex text-white bg-amber-700 border-0 py-3 px-6 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                        onClick={cancelBookmark}
                      >
                        <FaBookmark fill="white" className="mr-2" />
                        {piece.pieceBookmarkCount}
                      </button>
                    )}
                    {piece.pieceBookmarkYn === "N" && (
                      <button
                        className="flex text-white bg-amber-700 border-0 py-3 px-6 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                        onClick={setBookmark}
                      >
                        <FaRegBookmark fill="white" className="mr-2" />
                        {piece.pieceBookmarkCount}
                      </button>
                    )}
                    {piece.piecePrice > 0 && (
                      <button className="flex text-white bg-sky-700 border-0 py-3 px-6 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg transition">
                        작품 결제
                      </button>
                    )}
                  </div>

                  <button
                    className="flex text-white bg-gray-700 border-0 py-3 px-6 focus:outline-none hover:bg-gray-500 active:bg-gray-600 focus:ring focus:ring-gray-300 rounded-lg transition"
                    onClick={() => navigate("/pieces")}
                  >
                    <FaList fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 유저 아트 그림, 정보 */}
        {!cinema && piece && piece.pieceType === "A" && (
          <div
            className="mx-auto flex justify-center items-center absolute top-0 left-0"
            style={{
              // backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
              // height: "1009px",
              height: "93vh",
              // height: "92.95vh",
              width: "100vw",
            }}
          >
            <div className="flex">
              {/* 이미지 */}
              <img
                alt="gallery"
                className="object-contain rounded drop-shadow-md mr-8 cursor-pointer hover:opacity-80 transition"
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}`}
                style={{ maxWidth: "73vw", maxHeight: "90vh" }}
                onClick={() => setCinema(true)}
                data-aos="zoom-out"
              />

              {/* 설명 */}
              <div
                className="flex flex-col justify-between backdrop-blur-sm p-4"
                // style={{ width: "23vw", maxHeight: "90vh" }}
                data-aos="fade-left"
              >
                {/* 내용 */}
                <div className="flex flex-col">
                  <div
                    className="text-white mb-2 font-bold text-3xl"
                    style={{ lineHeight: "1" }}
                  >
                    {piece.pieceTitleKr}
                  </div>
                  <div className="text-white mb-4 font-bold text-xl">
                    {piece.pieceArtistKr}
                  </div>
                  <div className="text-white text-lg">{piece.pieceDesc}</div>
                  {piece.piecePrice > 0 && (
                    <div className="text-white text-lg">
                      &#8361; {piece.piecePrice}
                    </div>
                  )}
                  <div className="flex flex-wrap text-white text-lg mb-4">
                    {piece.pieceTag.split(",").map((tag) => (
                      <div
                        key={Math.random().toString()}
                        className="flex justify-center items-center text-white px-2 py-1 bg-gray-100 drop-shadow-md rounded-lg text-gray-800 mr-2"
                      >
                        <FaHashtag fill="" className="mr-1" /> <div>{tag}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex mb-4">
                    <div className="flex items-center text-white text-lg font-bold bg-gray-900 rounded-lg drop-shadow-md px-2 py-1 cursor-pointer hover:scale-105 transition">
                      <FaHashtag fill="white" className="mr-1" />{" "}
                      <div className="text-white text-lg font-bold">
                        {piece.pieceScent}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-white text-lg">
                    태그: {piece.pieceTag} ..
                  </div> */}
                </div>

                {/* 버튼 */}
                <div className="flex justify-between mb-2">
                  <div className="flex">
                    {piece.pieceBookmarkYn === "Y" && (
                      <button
                        className="flex text-white bg-amber-700 border-0 py-3 px-6 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                        onClick={cancelBookmark}
                      >
                        <FaBookmark fill="white" className="mr-2" />
                        {piece.pieceBookmarkCount}
                      </button>
                    )}
                    {piece.pieceBookmarkYn === "N" && (
                      <button
                        className="flex text-white bg-amber-700 border-0 py-3 px-6 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                        onClick={setBookmark}
                      >
                        <FaRegBookmark fill="white" className="mr-2" />
                        {piece.pieceBookmarkCount}
                      </button>
                    )}
                    {piece.piecePrice > 0 && (
                      <button
                        className="flex text-white bg-sky-700 border-0 py-3 px-6 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg transition"
                        onClick={paymentHandler}
                      >
                        <MdOutlinePayment fill="white" />
                      </button>
                    )}
                  </div>

                  <button
                    className="flex text-white bg-gray-700 border-0 py-3 px-6 focus:outline-none hover:bg-gray-500 active:bg-gray-600 focus:ring focus:ring-gray-300 rounded-lg transition"
                    onClick={() => navigate("/pieces")}
                  >
                    <FaList fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 시네마 모드 블러 배경 */}
        {cinema && piece && (
          <div
            className="mx-auto flex justify-center items-center bg-cover bg-center opacity-30 blur"
            style={{
              backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
              // height: "1009px",
              height: "100vh",
              // height: "92.95vh",
              width: "100vw",
            }}
            // data-aos="fade-in"
          ></div>
        )}

        {/* 시네마 모드 그림 */}
        {cinema && piece && (
          <div
            className="mx-auto flex justify-center items-center absolute top-0 left-0 cursor-pointer"
            style={{
              // backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}')`,
              // height: "1009px",
              height: "100vh",
              // height: "92.95vh",
              width: "100vw",
            }}
            onClick={() => setCinema(false)}
          >
            <div className="flex">
              {/* 이미지 */}
              <img
                alt="gallery"
                className="object-contain rounded drop-shadow-md mr-8 cursor-pointer transition"
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${piece.pieceImg}`}
                style={{ width: "100vw", height: "100vh" }}
                onClick={() => setCinema(false)}
                // data-aos="zoom-out"
                data-aos="fade-in"
              />
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default Piece;
