import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authApi, userArtApi } from "../../../api/api";

const Arts = () => {
  const navigate = useNavigate();
  const { targetUserSeq } = useParams();
  const [selectedTab, setSelectedTab] = useState("나의 아트");
  const [userArts, setUserArts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    const fetchUserArts = async () => {
      try {
        const res = await userArtApi.getUserArts(1);
        console.log("res:", res);
        // setUserArts(data);
      } catch (err) {
        console.error(err);
      }
    };
    const getMyPageInfo = async () => {
      try {
        const res = await authApi.getMyPage(targetUserSeq);
        setIsMine(res.data.userIsMe === "Y" ? true : false);
      } catch (error) {
        console.error("해당하는 유저가 존재하지 않습니다");
      }
    };
    getMyPageInfo();
    fetchUserArts();
    // dispatch(getBookmarks());
  }, [targetUserSeq]);

  const getMyArts = () => {
    setSelectedTab("나의 아트");
  };

  const getBookmarkArts = () => {
    setSelectedTab("북마크한 아트");
    const fetchBookmarks = async () => {
      try {
        const { data } = await authApi.getBookmarks();
        setBookmarks(data.bookmarkList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookmarks();
  };

  return (
    <div className="flex flex-col" data-aos="fade-in">
      <div className="flex mb-10">
        <div
          key={"1"}
          className={`flex cursor-pointer px-5 py-2 border-solid border-b-4 text-gray-600 border-gray-200 transition ${
            selectedTab === "나의 아트" && "font-bold border-sky-400"
          }`}
          onClick={getMyArts}
        >
          나의 아트
        </div>
        {isMine && (
          <div
            key={"2"}
            className={`flex cursor-pointer px-5 py-2 border-solid border-b-4 text-gray-600 border-gray-200 transition ${
              selectedTab === "북마크한 아트" && "font-bold border-sky-400"
            }`}
            onClick={getBookmarkArts}
          >
            북마크 아트
          </div>
        )}
      </div>

      {/* <ArtList /> */}
      {/* <div className="grid grid-cols-4 gap-2 pb-24 mx-auto"> */}
      <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2">
        {selectedTab === "나의 아트" &&
          userArts?.map((userArt) => (
            <div
              key={Math.random().toString()}
              className="rounded-lg drop-shadow-md overflow-hidden relative cursor-pointer mb-2"
              onClick={() => navigate(`/pieces/${userArt.pieceSeq}`)}
              data-aos="fade-in"
            >
              {/* 그림 */}
              {/* <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}')`,
                }}
              ></div> */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${userArt.pieceImg}')`,
                }}
              ></div>

              {/* 설명 */}
              <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 ease-in-out duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center">
                <div className="text-1xl text-white font-semibold mb-2">
                  {userArt.pieceArtistKr}
                </div>
                <div className="text-1xl text-white font-semibold">
                  {userArt.pieceTitleKr}
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center rounded transition ease-in-out duration-300"
                // src={`https://source.unsplash.com/random/${parseInt(
                //   (Math.random() * (40 - 10) + 10) * 10
                // )}x${parseInt((Math.random() * (50 - 10) + 10) * 10)}`}
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${userArt.pieceImg}`}
              />
            </div>
          ))}
        {selectedTab === "나의 아트" && userArts.length === 0 && (
          <div data-aos="fade-in">나의 아트가 없습니다.</div>
        )}

        {selectedTab === "북마크한 아트" &&
          bookmarks?.map((bookmark) => (
            <div
              key={Math.random().toString()}
              className="rounded-lg drop-shadow-md overflow-hidden relative cursor-pointer mb-2"
              onClick={() => navigate(`/pieces/${bookmark.pieceSeq}`)}
              data-aos="fade-in"
            >
              {/* 그림 */}
              {/* <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}')`,
                }}
              ></div> */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${bookmark.pieceImg}')`,
                }}
              ></div>

              {/* 설명 */}
              <div className="opacity-0 hover:opacity-90 hover:bg-gray-900 ease-in-out duration-300 absolute inset-0 z-10 flex flex-col justify-center items-center">
                <div className="text-1xl text-white font-semibold mb-2">
                  {bookmark.pieceArtistKr}
                </div>
                <div className="text-1xl text-white font-semibold">
                  {bookmark.pieceTitleKr}
                </div>
              </div>
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center rounded transition ease-in-out duration-300"
                // src={`https://source.unsplash.com/random/${parseInt(
                //   (Math.random() * (40 - 10) + 10) * 10
                // )}x${parseInt((Math.random() * (50 - 10) + 10) * 10)}`}
                src={`http://j7d201.p.ssafy.io/api/my-file/read/${bookmark.pieceImg}`}
              />
            </div>
          ))}
        {selectedTab === "북마크한 아트" && bookmarks.length === 0 && (
          <div data-aos="fade-in">북마크 아트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Arts;
