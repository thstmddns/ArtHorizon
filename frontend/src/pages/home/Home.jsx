import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import NavigationBar from "../../components/NavigationBar";
import SearchBar from "../../components/serach/SerachBar";
import Card from "../../components/piece/Card";
import baseurl from "../../api/BaseUrl";
// import Newart from "../../api/Newart";

const Home = () => {
  const [pictures, setPictures] = useState([]);

  const Newart = (page) => {
    const url = `${baseurl}/pieces/recent`;
    axios
      .get(url, {
        params: {
          page: page,
        },
      })
      .then((res) => {
        const content = res.content;
        // const totalPage = res.totalPage;
        setPictures(content);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const content = Newart(1);
    console.log(content);
    // setPictures(content.pieceList);
  }, []);
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
                    id={picture.pieceSeq}
                    title={picture.pieceTitle}
                    image={picture.pieceImg}
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
