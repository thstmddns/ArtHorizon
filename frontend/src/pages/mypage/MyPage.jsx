import React from "react";
import styled from "styled-components";

import NavBar from "../../components/NavBar";
import Info from "./components/Info";
import Arts from "./components/Arts";

const MyPage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Wrapper>
          <Info />
          <Arts />
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
`;
