import React from "react";
import styled from "styled-components";

import ArtListItem from "./ArtListItem";

const ArtList = () => {
  const DUMMY_ARTS = [
    {
      title: "title1",
      content: "content1",
    },
    {
      title: "title2",
      content: "content2",
    },
    {
      title: "title3",
      content: "content3",
    },
    {
      title: "title4",
      content: "content4",
    },
    {
      title: "title5",
      content: "content5",
    },
    {
      title: "title6",
      content: "content6",
    },
  ];
  return (
    <Wrapper>
      {DUMMY_ARTS.map((art) => (
        <ArtListItem key={Math.random().toString()} />
      ))}
    </Wrapper>
  );
};

export default ArtList;

const Wrapper = styled.ul`
  // display: flex;
  // flex-flow: wrap;
  display: grid;
  // grid-template-columns: repeat(4, 1fr);
  // grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  // gap: 10px 10px;
`;
