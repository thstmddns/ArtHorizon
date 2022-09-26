import React from "react";
import styled from "styled-components";

const Card = (props) => {
  return (
    <CardWrapper>
      {/* <RadiusImg src={props.image} alt="pic" /> */}
      <div>Card will here</div>
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
