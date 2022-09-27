import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

const Footer = () => {
  return (
    <div>
      <hr />
      <br />
      <BlueButton>아트 등록하기</BlueButton>
      <WhiteButton>목록으로</WhiteButton>
    </div>
  );
};

export default Footer;

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
