import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getBookmarks } from "../../../redux/authSlice";

import { authApi } from "../../../api/api";

import ArtList from "./ArtList";

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
    <Wrapper>
      <Tabs>
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
      </Tabs>

      {/* <ArtList /> */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 pb-24 mx-auto">
          <div className="flex flex-wrap -m-4 gap-2">
            {selectedTab === "나의 아트" &&
              myArts?.map((bookmark) => (
                <div
                  key={Math.random().toString()}
                  className="shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md"
                  onClick={() => navigate(`${bookmark.pieceSeq}`)}
                >
                  {/* 그림 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                      backgroundImage: `url('https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}')`,
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
                    src={`https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}`}
                  />
                </div>
              ))}
            {selectedTab === "북마크한 아트" &&
              bookmarks?.map((bookmark) => (
                <div
                  key={Math.random().toString()}
                  className="shadow-md rounded mb-2 drop-shadow-md overflow-hidden relative cursor-pointer xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md"
                  onClick={() => navigate(`${bookmark.pieceSeq}`)}
                >
                  {/* 그림 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                      backgroundImage: `url('https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}')`,
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
                    src={`https://source.unsplash.com/random/${bookmark.pieceSeq}x${bookmark.pieceSeq}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Arts;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // background-color: tomato;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  font-size: 1.5rem;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  background-color: ${(props) => (props.isSelected ? "#f2f2f0" : "ffffff")};
  cursor: pointer;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
  &:hover {
    text-decoration: underline;
  }
`;
