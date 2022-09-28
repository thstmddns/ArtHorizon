import React from "react";
import styled from "styled-components";

import TailwindNavBar from "../../components/TailwindNavBar";
import Info from "./components/Info";
import Arts from "./components/Arts";

const TailwindMyPage = () => {
  return (
    <React.Fragment>
      <TailwindNavBar />
      <Container>
        <Wrapper>
          <Info />
          <Arts />
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};

export default TailwindMyPage;

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
