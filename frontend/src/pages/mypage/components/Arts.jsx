import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authApi } from "../../../api/api";

const Arts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("나의 아트");
  const [myArts, setMyArts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // const fetchBookmarks = async () => {
    //   try {
    //     const { data } = await authApi.getBookmarks();
    //     setBookmarks(data.bookmarkList);
    //     console.log("data:", data);
    //   } catch (error) {}
    // };
    // fetchBookmarks();
    // dispatch(getBookmarks());
  }, []);

  const getMyArts = () => {
    setSelectedTab("나의 아트");
  };

  const getBookmarkArts = () => {
    setSelectedTab("북마크한 아트");
    const fetchBookmarks = async () => {
      try {
        const { data } = await authApi.getBookmarks();
        setBookmarks(data.bookmarkList);
        console.log("bookmarks data:", data);
      } catch (error) {}
    };
    fetchBookmarks();
  };

  return (
    <div className="flex flex-col">
      <div className="flex mb-10">
        <Tab
          key={"1"}
          isSelected={"나의 아트" === selectedTab}
          onClick={getMyArts}
        >
          나의 아트
        </Tab>
        <Tab
          key={"2"}
          isSelected={"북마크한 아트" === selectedTab}
          onClick={getBookmarkArts}
        >
          북마크한 아트
        </Tab>
      </div>

      {/* <ArtList /> */}
      <div className="grid grid-cols-4 gap-2 pb-24 mx-auto">
        {selectedTab === "북마크한 아트" &&
          bookmarks?.map((bookmark) => (
            <div
              key={Math.random().toString()}
              className="rounded-lg drop-shadow-md overflow-hidden relative cursor-pointer"
              onClick={() => navigate(`/pieces/${bookmark.pieceSeq}`)}
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
      </div>
    </div>
  );
};

export default Arts;

const Tab = styled.div`
  font-size: 1.5rem;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  background-color: ${(props) => (props.isSelected ? "#f2f2f0" : "ffffff")};
  cursor: pointer;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
  &:hover {
    text-decoration: underline;
  }
`;
