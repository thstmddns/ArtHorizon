import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authApi, userArtApi } from "../../../api/api";

const Arts = () => {
  const navigate = useNavigate();
  const { targetUserSeq } = useParams();
  const [selectedTab, setSelectedTab] = useState("나의 아트");
  const [userArts, setUserArts] = useState([]);
  const [boomarkArts, setBookmarkArts] = useState([]);

  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    // 마이페이지 정보 가져오기
    authApi
      .getMyPage(targetUserSeq)
      .then((res) => {
        setIsMine(res.data.userIsMe === "Y" ? true : false);

        // 화가이면 유저 아트 가져오기
        if (res.data.userType === "A") {
          userArtApi
            .getUserArts(targetUserSeq)
            .then((res) => setUserArts(res.data))
            .catch(() => toast.error("나의 아트 가져오기 실패"));
        }

        // 나의 마이페이지이면 북마크 아트 가져오기
        if (res.data.userIsMe === "Y") {
          authApi
            .getBookmarkArts()
            .then((res) => setBookmarkArts(res.data))
            .catch(() => toast.error("북마크 아트 가져오기 실패"));
        }
      })
      .catch(() => {}); // 존재하지 않는 유저입니다 라고 Info.jsx에서 toast 처리해서 여기서는 하지 않음
  }, [targetUserSeq]);

  return (
    <div className="flex flex-col" data-aos="fade-in">
      <div className="flex mb-10">
        <div
          key={"1"}
          className={`flex cursor-pointer px-5 py-2 border-solid border-b-4 text-gray-600 border-gray-200 transition ${
            selectedTab === "나의 아트" && "font-bold border-sky-400"
          }`}
          onClick={() => setSelectedTab("나의 아트")}
        >
          나의 아트
        </div>
        {isMine && (
          <div
            key={"2"}
            className={`flex cursor-pointer px-5 py-2 border-solid border-b-4 text-gray-600 border-gray-200 transition ${
              selectedTab === "북마크한 아트" && "font-bold border-sky-400"
            }`}
            onClick={() => setSelectedTab("북마크한 아트")}
          >
            북마크 아트
          </div>
        )}
      </div>

      <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2">
        {/* 나의 아트 */}
        {selectedTab === "나의 아트" &&
          userArts?.map((userArt) => (
            <div
              key={Math.random().toString()}
              className="rounded-lg drop-shadow-md overflow-hidden relative cursor-pointer mb-2"
              onClick={() => navigate(`/pieces/${userArt.pieceSeq}`)}
              data-aos="fade-in"
            >
              {/* 그림 */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${userArt.pieceImg}')`,
                }}
              ></div>

              {/* 설명 */}
              <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 absolute inset-0 z-10 flex flex-col justify-center items-center transition">
                <div className="text-2xl text-white font-semibold mb-2">
                  {userArt.pieceTitle}
                </div>
                <div className="text-1xl text-white font-semibold">
                  {userArt.pieceArtist}
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center rounded transition"
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${userArt.pieceImg}`}
              />
            </div>
          ))}

        {/* 나의 아트 없음 */}
        {selectedTab === "나의 아트" && userArts?.length === 0 && (
          <div data-aos="fade-in">나의 아트가 없습니다.</div>
        )}

        {/* 북마크 아트 */}
        {selectedTab === "북마크한 아트" &&
          boomarkArts?.map((bookmark) => (
            <div
              key={Math.random().toString()}
              className="rounded-lg drop-shadow-md overflow-hidden relative cursor-pointer mb-2"
              onClick={() => navigate(`/pieces/${bookmark.pieceSeq}`)}
              data-aos="fade-in"
            >
              {/* 그림 */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${bookmark.pieceImg}')`,
                }}
              ></div>

              {/* 설명 */}
              <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 absolute inset-0 z-10 flex flex-col justify-center items-center transition">
                <div className="text-2xl text-white font-semibold mb-2">
                  {bookmark.pieceTitleKr}
                </div>
                <div className="text-1xl text-white font-semibold">
                  {bookmark.pieceArtistKr}
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center rounded transition"
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${bookmark.pieceImg}`}
              />
            </div>
          ))}

        {/* 북마크 아트 없음 */}
        {selectedTab === "북마크한 아트" && !boomarkArts && (
          <div data-aos="fade-in">북마크 아트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Arts;
