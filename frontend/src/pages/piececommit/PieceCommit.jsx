import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import { VscChromeClose } from "react-icons/vsc";

import NavigationBar from "../../components/NavigationBar";
import Input from "../../components/input/Input";
import Button from "../../components/Button";

const PieceCommit = () => {
  const [newArt, setNewArt] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

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

  const tagItemUpdate = (text) => {
    setNewTag(text);
    console.log(newTag);
  };

  const onAddTag = () => {
    let tagArr = [...tags];
    tagArr.push(newTag);
    setNewTag("");
    setTags(tagArr);
  };

  const deleteTag = (index) => {
    console.log(index);
    let tagArr = [...tags];
    tagArr.splice(index, 1);
    setTags(tagArr);
  };

  const submitPiece = () => {};

  return (
    <div>
      <NavigationBar />
      <ItemContainer>
        <Title>나의 아트 등록</Title>
        <hr />
        <RegistItem>아트 이미지</RegistItem>
        <Imgwrapper>
          {newArt ? <Img src={newArt} alt="newart" /> : <DefaultBox />}
        </Imgwrapper>
        <ButtonWrapper>
          <ImgInput
            type="file"
            accept="image/png"
            ref={ImageInput}
            onChange={(e) => updateImg(e.target.files[0])}
          />
          <BringButton onClick={handleChange}>아트 업로드</BringButton>
        </ButtonWrapper>
        <RegistItem>제목</RegistItem>
        <TitleInput placeholder="제목을 입력해주세요" />
        <RegistItem>아트 설명</RegistItem>
        <ArtTextInput placeholder="설명을 입력해주세요" />
        <RegistItem>판매 여부</RegistItem>
        <Allow>
          {/* 스위치 안에 허용/거부 넣으면 될듯 */}
          <AllowCheck>판매 여부를 결정해주세요</AllowCheck>
          <input type="checkbox" />
        </Allow>
        <PriceInput
          placeholder="원하는 가격을 입력해주세요"
          type="number"
          min="0"
          step="10000"
          onChange={(e) => updatePrice(e.target.value)}
        />
        <RegistItem>태그 추가</RegistItem>
        <TagWrapper>
          <TagInput
            type="text"
            value={newTag}
            onChange={(e) => tagItemUpdate(e.target.value)}
          />
          <BlueButton onClick={onAddTag} value={newTag} name={newTag}>
            태그 추가
          </BlueButton>
          <WhiteButton>태그 추천받기</WhiteButton>
        </TagWrapper>
        <TagContainer>
          <Row>
            {tags?.map((tag, index) => {
              if (index % 2) {
                return (
                  <ColItem key={tag}>
                    <BlueItem sm={3}>
                      # {tag}
                      <div onClick={() => deleteTag(index)}>
                        <VscChromeClose
                          color="white"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </BlueItem>
                  </ColItem>
                );
              } else {
                return (
                  <ColItem key={tag}>
                    <WhiteItem sm={3}>
                      # {tag}
                      <div onClick={() => deleteTag(index)}>
                        <VscChromeClose
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </WhiteItem>
                  </ColItem>
                );
              }
            })}
          </Row>
        </TagContainer>
        <hr />
        <br />
        <BlueButton type="submit" onClick={submitPiece}>
          아트 등록하기
        </BlueButton>
        <WhiteButton>목록으로</WhiteButton>
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
  &:: placeholder {
    color: #8d959f;
  }
`;

const ArtTextInput = styled.textarea`
  width: 60%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  resize: none;
  &:: placeholder {
    color: #8d959f;
  }
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

const PriceInput = styled(Input)`
  width: 300px;
  &:: placeholder {
    color: #8d959f;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TagInput = styled(Input)`
  width: 400px;
  margin-right: 20px;
`;

const BlueButton = styled(Button)`
  width: 200px;
  height: 40px;
  font-size: 15px;
  margin-right: 20px;
`;

const WhiteButton = styled(Button)`
  width: 200px;
  color: #88c4e6;
  height: 40px;
  font-size: 15px;
  background-color: #ffffff;
`;

const TagContainer = styled.div`
  margin-top: 30px;
  margin-left: 0px;
  width: 1080px;
`;

const ColItem = styled(Col)`
  padding: 15px;
`;

const BlueItem = styled.div`
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  width: 200px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const WhiteItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
