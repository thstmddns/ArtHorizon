import React from "react";
import styled from "styled-components";
import Input from "../../../components/input/Input";

const PieceExplanation = () => {
  return (
    <div>
      <RegistItem>제목</RegistItem>
      <TitleInput placeholder="제목을 입력해주세요" />
      <RegistItem>아트 설명</RegistItem>
      <ArtTextInput placeholder="설명을 입력해주세요" />
      <RegistItem>판매 여부</RegistItem>
    </div>
  );
};

export default PieceExplanation;

const RegistItem = styled.div`
  font-weight: bolder;
  font-size: 1em;
  margin: 3em 0 1em 0;
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