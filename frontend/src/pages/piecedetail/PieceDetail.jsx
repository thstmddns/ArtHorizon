import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";

import styled from "styled-components";
import baseurl from "../../api/BaseUrl";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";

const PieceDetail = () => {
  const { pieceSeq } = useParams();
  const [pieceType, setPieceType] = useState("");
  const [title, setTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [enArtist, setEnArtist] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [hitCount, setHitCount] = useState(0);
  const [bookMark, setBookMark] = useState(0);
  const [tags, setTags] = useState([]);
  const [year, setYear] = useState(0);
  const [century, setCentury] = useState(0);
  const [style, setStyle] = useState("");
  const [genre, setGenre] = useState("");
  const [scent, setScent] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getPieceDetail = async () => {
      try {
        const res = await axios
          .get(`${baseurl}/api/pieces/${pieceSeq}`)
          .then((res) => {
            console.log(res.data);
            setPieceType(res.data.pieceType);
            setTitle(res.data.pieceTitleKr);
            setEnTitle(res.data.pieceTitleEn);
            setArtist(res.data.pieceArtistKr);
            setEnArtist(res.data.pieceArtistEn);
            setDesc(res.data.pieceDesc);
            setImg(res.data.pieceImg);
            setHitCount(res.data.pieceHitCount);
            setBookMark(res.data.pieceBookmarkCount);
            setTags(res.data.pieceTag);
            setYear(res.data.pieceYear);
            setCentury(res.data.pieceCentury);
            setStyle(res.data.pieceStyle);
            setGenre(res.data.pieceGenre);
            setScent(res.data.pieceScent);
            setPrice(res.data.piecePrice);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error) {
        console.error(error);
      }
    };
    getPieceDetail();
  }, []);

  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <PieceContainer>
        {img ? (
          <PieceImg
            // src={`/home/ubuntu/S07P22D201/frontend/docker-volume/images/${img}`}
            src={`http://j7d201.p.ssafy.io/api/my-file/read/${img}`}
            alt="displayerror"
            style={{
              width: "1000px",
              height: "1000px",
            }}
          />
        ) : (
          <DefaultImg />
        )}
        <PieceDetails>
          <Title>작품명</Title>
          <Content>{title}</Content>
          <Content>({enTitle})</Content>
          <Title>작가</Title>
          <Content>{artist}</Content>
          <Content>({enArtist})</Content>
          <Title>제작시기</Title>
          {pieceType === "M" ? (
            <Content>
              {year} / {century}C
            </Content>
          ) : (
            <Content>{year}</Content>
          )}
          {desc === null ? (
            <></>
          ) : (
            <div>
              <Title>설명</Title>
              <Content>{desc}</Content>
            </div>
          )}
          <Title>태그</Title>
          <Content>
            <Row>
              {tags?.map((tag) => {
                return <Col sm={3}>{tag}</Col>;
              })}
            </Row>
          </Content>
          {price !== 0 && (
            <div>
              <Title>가격</Title>
              <Content>{price}</Content>
            </div>
          )}
          <Title></Title>
          <Content></Content>
          <Title></Title>
          <Content></Content>
          <Title></Title>
          <Content></Content>
          <Title></Title>
          <Content></Content>
          <Container>
            <Row>
              <Col sm={4}>
                <WhiteButton>돌아가기</WhiteButton>
              </Col>
              <Col sm={4}>
                <BlueButton>결제하기</BlueButton>
              </Col>
              <Col sm={4}>
                <WhiteButton>북마크</WhiteButton>
              </Col>
            </Row>
          </Container>
        </PieceDetails>
      </PieceContainer>
    </React.Fragment>
  );
};

export default PieceDetail;

const PieceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const PieceImg = styled.img`
  max-width: 1350px;
  object-fit: contain;
`;

const DefaultImg = styled.div`
  width: 1350px;
  height: 900px;
`;

const PieceDetails = styled.div`
  width: 380px;
  overflow: scroll;
  padding: 0px 20px;
  background: rgba(217, 217, 217, 0.8);
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Content = styled.div`
  padding: 2px 0px;
`;

const BlueButton = styled(Button)`
  width: 100px;
  height: 40px;
  font-size: 15px;
  margin-top: 10px;
  margin-right: 20px;
`;

const WhiteButton = styled(Button)`
  width: 100px;
  color: #88c4e6;
  height: 40px;
  font-size: 15px;
  margin-top: 10px;
  background-color: #ffffff;
`;
