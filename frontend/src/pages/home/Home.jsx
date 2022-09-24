import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../../components/serach/SerachBar";
import NavigationBar from "../../components/NavigationBar";
import Newart from "../../api/Newart";

const Home = () => {
  const [pictures, setPictures] = useState([]);

  // useEffect(() => {
  //   const { content } = Newart(0);
  //   setPictures(content);
  // }, []);
  return (
    <Main>
      <NavigationBar />
      <Container>
        <SearchBar />
        <div>
          <hr />
          <div className="TagRecommend">
            <TopText>
              <Title>태그 추천</Title>
            </TopText>
          </div>
          <div className="NewArt">
            <TopText>
              <Title>최근 등록된 작품</Title>
              <Link to="pieces">더 보기</Link>
            </TopText>
            <div>
              {pictures.map((picture) => {
                return (
                  <Card
                    key={picture.pieceSeq}
                    title={picture.pieceTitle}
                    id={picture.pieceSeq}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default Home;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
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

const Card = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
