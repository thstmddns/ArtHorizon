import React from "react";
import styled from "styled-components";

const Card = (props) => {
  return (
    <CardWrapper>
      <RadiusImg src={`http://j7d201.p.ssafy.io:8081${props.image}`} />
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const RadiusImg = styled.img`
  border-radius: 10px;
  max-height: 280px;
  max-width: 280px;
`;
