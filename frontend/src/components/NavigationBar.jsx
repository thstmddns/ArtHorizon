import React from "react";
import { Link, redirect } from "react-router-dom";
import styled from "styled-components";

import Art_Horzion_Logo from "../assets/images/Art_Horizon_Logo.png";

const NavigationBar = () => {
  const goHelp = () => {
    return redirect("/help");
  };

  const goMyPage = () => {
    return redirect("/mypage");
  };

  return (
    <Container>
      <LeftLogo>
        {/* 여기에 로고가 들어갈 예정 */}
        <Link to="/">
          <LogoImg src={Art_Horzion_Logo} alt="Art-Horizon" />
        </Link>
      </LeftLogo>
      <ServiceList>
        <NoneLink to="/pieces">작품 목록</NoneLink>
        <NoneLink to="">Style Transfer</NoneLink>
        <NoneLink to="">그림의향</NoneLink>
        <NoneLink to="/help">고객센터</NoneLink>
      </ServiceList>
      <RightUser>
        {/* 유저 관련 아이콘 */}
        <div onClick={goMyPage}>user</div>
      </RightUser>
    </Container>
  );
};

export default NavigationBar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  box-shadow: 0px 3px #a3aaaf;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 5%;
  align-items: center;
`;

const LeftLogo = styled.div`
  margin-left: 1%;
`;

const RightUser = styled.div`
  margin-right: 1%;
`;

const LogoImg = styled.img`
  height: 40px;
`;

const NoneLink = styled(Link)`
  text-decoration: none;
  margin: 0 1%;
  width: 8vw;
`;
