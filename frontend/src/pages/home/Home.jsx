import { useEffect } from "react"; React from "react";
import { Link } from "react-router-dom"

const Main = () => {
  useEffect(
    
  )
  return (
    <div>
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
        </div>
      </div>
    </div>
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
`