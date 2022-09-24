import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Newart from "../../api/Newart";
import SearchBar from "../../components/serach/SerachBar";

const Main = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const { content } = Newart(0);
    setPictures(content);
  }, []);
  return (
    <Main>
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
              <Card
                key={picture.pieceSeq}
                title={picture.pieceTitle}
                id={picture.pieceSeq}
              />;
            })}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Main;

const TopText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
