import React, { useState } from "react";
import styled from "styled-components";

import ArtList from "./ArtList";

const Arts = () => {
  const [selectedTab, setSelectedTab] = useState("나의 아트");

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
          isSelected={"나의 아트" === selectedTab}
          onClick={() => setSelectedTab("나의 아트")}
        >
          나의 아트
        </Tab>
        <Tab
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
