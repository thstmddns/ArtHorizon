import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import NavigationBar from "../../components/NavigationBar";
import SearchBar from "../../components/serach/SerachBar";
import { Container, Row, Col } from "react-grid-system";
import Card from "../../components/piece/Card";
import baseurl from "../../api/BaseUrl";
// import Newart from "../../api/Newart";

const Home = () => {
  const [pictures, setPictures] = useState([]);

  const Newart = async (page) => {
    const url = `${baseurl}/pieces/recent?page=1`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        const content = res.data.pieceList;
        // const totalPage = res.totalPage;
        setPictures(content);
      })
      .catch((err) => {
        alert(err);
        console.log(err.response);
      });
  };

  // useEffect(() => {
  //   const content = Newart(1);
  //   console.log(content);
  //   // setPictures(content.pieceList);
  // }, []);

  const testrender = () => {
    const result = [];
    for (let i = 1; i < 9; i++) {
      result.push(
        <CardCol sm={3}>
          <Card />
        </CardCol>
      );
    }
    return result;
  };

  return (
    <Main>
      <NavigationBar />
      <MainContainer>
        <SearchBar />
        <div>
          <hr />
          <div className="TagRecommend">
            <TopText>
              <Title>태그 추천</Title>
            </TopText>
          </div>
          <hr />
          <div className="NewArt">
            <TopText>
              <Title>최근 등록된 작품</Title>
              <Link to="pieces">더 보기</Link>
            </TopText>
            <PieceWrapper>
              <Row justify="center">{testrender()}</Row>
              {pictures.map((picture) => {
                return (
                  <Card
                    key={picture.pieceSeq}
                    id={picture.pieceSeq}
                    title={picture.pieceTitle}
                    image={picture.pieceImg}
                  />
                );
              })}
            </PieceWrapper>
          </div>
        </div>
      </MainContainer>
    </Main>
  );
};

export default Home;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.div`
  padding: 0 5vw;
`;

const TopText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PieceWrapper = styled(Container)`
  margin: 3vw 1vw;
`;

const CardCol = styled(Col)`
  width: 280px;
  height: 280px;
  padding: auto 1vw;
`;
