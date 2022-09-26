import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

import NavigationBar from "../../components/NavigationBar";
import Input from "../../components/input/Input";

const PieceCommit = () => {
  const [newArt, setNewArt] = useState("");
  const [price, setPrice] = useState(0);
  const ImageInput = useRef();

  const handleChange = () => {
    ImageInput.current.click();
  };

  const updateImg = (file) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setNewArt(reader.result);
        resolve();
      };
    });
  };

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Title>나의 아트 등록</Title>
        <hr />
        <RegistItem>아트 이미지</RegistItem>
        <Imgwrapper>
          {newArt ? <Img src={newArt} alt="newart" /> : <DefaultBox />}
        </Imgwrapper>
        <ButtonWrapper>
          <ImgInput
            type="file"
            ref={ImageInput}
            onChange={(e) => updateImg(e.target.files[0])}
          />
          <BringButton onClick={handleChange}>아트 업로드</BringButton>
        </ButtonWrapper>
        <RegistItem>제목</RegistItem>
        <TitleInput />
        <RegistItem>아트 설명</RegistItem>
        <ArtTextInput />
        <RegistItem>판매 여부</RegistItem>
        <Allow>
          {/* 스위치 안에 허용/거부 넣으면 될듯 */}
          <AllowCheck>판매 여부를 결정해주세요</AllowCheck>
          <input type="checkbox" />
        </Allow>
        <Price
          placeholder="원하는 가격을 입력해주세요"
          onChange={(e) => updatePrice(e.target.value)}
        />
        <RegistItem>태그 추가</RegistItem>
        <TagWrapper>
          <TagInput />
        </TagWrapper>
      </Container>
    </div>
  );
};

export default PieceCommit;

const Container = styled.div`
  margin: 2vw 2vw;
  padding: 3vw 6vw;
  background: #f9f9f7;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 1.5em;
`;

const RegistItem = styled.div`
  font-weight: bolder;
  font-size: 1em;
  margin: 3em 0 1em 0;
`;

const Imgwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2vw 0;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 60%;
  max-height: 40%;
`;

const DefaultBox = styled.div`
  width: 250px;
  height: 250px;
  background: #dedede;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ImgInput = styled.input`
  display: none;
`;

const BringButton = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  color: #ffffff;
  border-radius: 10px;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #88c4e6;
    color: #6cb6e1;
  }
  margin-left: auto;
`;

const TitleInput = styled(Input)`
  width: 60%;
`;

const ArtTextInput = styled.textarea`
  width: 60%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  resize: none;
`;

const Allow = styled.div`
  display: flex;
  flex-direction: row;
`;

const AllowCheck = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 2rem;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  margin-bottom: 1vw;
`;

const Price = styled(Input)`
  width: 300px;
  &:: placeholder {
    color: #8d959f;
  }
`;
