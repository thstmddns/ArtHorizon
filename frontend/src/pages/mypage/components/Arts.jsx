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
      <ArtList />
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
