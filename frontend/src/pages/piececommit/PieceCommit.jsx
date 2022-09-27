import styled from "styled-components";

import NavigationBar from "../../components/NavigationBar";
import ImgUpload from "./components/ImgUpload";
import PieceExplanation from "./components/PieceExplanation";
import Price from "./components/Price";
import TagPlus from "./components/TagPlus";
import Footer from "./components/Footer";

const PieceCommit = () => {
  return (
    <div>
      <NavigationBar />
      <ItemContainer>
        <ImgUpload />
        <PieceExplanation />
        <Price />
        <TagPlus />
        <Footer />
      </ItemContainer>
    </div>
  );
};

export default PieceCommit;

const ItemContainer = styled.div`
  margin: 2vw 2vw;
  padding: 3vw 6vw;
  background: #f9f9f7;
`;
