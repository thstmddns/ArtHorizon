import React from "react";
import styled from "styled-components";

const Info = () => {
  return (
    <Wrapper>
      <ImageBox>{/* <img /> */}</ImageBox>

      <ContentBox>
        <Row>
          <Nickname>nickname</Nickname>
          <Classification>화가</Classification>
        </Row>
        <Row>
          <Email>gkagmlwn@namver.com</Email>
        </Row>
        <Row>
          <Col>나의 그림 22</Col>
          <Col>팔로워 17</Col>
          <Col>팔로잉 33</Col>
        </Row>
      </ContentBox>

      <Button>프로필 수정</Button>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #d9dee4;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  border: 1px solid #888383;
  margin-right: 50px;
  background-color: #f5f5f5;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: wheat;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Nickname = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 10px;
`;

const Classification = styled.div`
  color: #6cb6e1;
  margin-top: 20px;
`;

const Email = styled.div``;

const Col = styled.div`
  margin-right: 20px;
`;

// const Button = styled.button`
//   cursor: pointer;
//   background-color: #88c4e6;
//   border: 1px solid #6cb6e1;
//   border-radius: 10px;
//   color: #ffffff;
//   width: 15rem;
//   height: 45px;
//   font-size: 1.2rem;
//   font-weight: bold;
//   margin-top: 10px;
//   margin-bottom: 30px;
//   &:hover {
//     background-color: #6cb6e1;
//     border: 1px solid #88c4e6;
//   }
//   margin-left: auto;
// `;

const Button = styled.button`
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #88c4e6;
  border-radius: 10px;
  color: #6cb6e1;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #88c4e6;
    border: 1px solid #6cb6e1;
    color: #ffffff;
  }
  margin-left: auto;
`;
