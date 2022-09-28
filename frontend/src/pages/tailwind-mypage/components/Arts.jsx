import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { getBookmarks } from "../../../redux/authSlice";

import ArtList from "./ArtList";

const Arts = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("나의 아트");

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  switch (selectedTab) {
    case "나의 아트":
      console.log(selectedTab);
      break;

    case "북마크한 아트":
      console.log(selectedTab);
      break;
    default:
      break;
  }
  return (
    <Wrapper>
      <Tabs>
        <Tab
          key={"1"}
          isSelected={"나의 아트" === selectedTab}
          onClick={() => setSelectedTab("나의 아트")}
        >
          나의 아트
        </Tab>
        <Tab
          key={"2"}
          isSelected={"북마크한 아트" === selectedTab}
          onClick={() => setSelectedTab("북마크한 아트")}
        >
          북마크한 아트
        </Tab>
      </Tabs>

      {/* <ArtList /> */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 pb-24 mx-auto">
          {/* <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Master Cleanse Reliac Heirloom
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom.
            </p>
          </div> */}
          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/600x360"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Shooting Stars
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/601x361"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    The Catalyzer
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/603x363"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    The 400 Blows
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/602x362"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Neptune
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/605x365"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Holden Caulfield
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow-md">
              <div class="flex relative">
                <img
                  alt="gallery"
                  class="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/606x366"
                />
                <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 class="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    Alper Kamu
                  </h1>
                  <p class="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
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
