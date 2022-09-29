import React from "react";
import styled from "styled-components";

import ArtListItem from "./ArtListItem";

const ArtList = (props) => {
  return <Wrapper></Wrapper>;
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
