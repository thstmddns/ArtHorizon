import React from "react";
import styled from "styled-components";

import Info from "./components/Info";
import Arts from "./components/Arts";

const Mypage = () => {
  return (
    <Container>
      <Wrapper>
        <Info />
        <Arts />
      </Wrapper>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  // background-color: tomato;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  // background-color: wheat;
`;
