import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getUser, logout } from "../redux/authSlice";

import logoImage from "../assets/images/Art_Horizon_Logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    mySeq: userSeq,
    myNickname,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, isLoggedIn]);

  return (
    <Container>
      <Left>
        <Link to="/">
          <LogoImg src={logoImage} alt="Art-Horizon" />
        </Link>
      </Left>
      <Right>
        <Links>
          <ServiceLink to="/pieces">작품 목록</ServiceLink>
          <ServiceLink to="">Style Transfer</ServiceLink>
          <ServiceLink to="">그림의향</ServiceLink>
          <ServiceLink to="/help">고객센터</ServiceLink>
        </Links>
        {!isLoggedIn && (
          <AuthWrapper>
            <NeedAuth onClick={() => navigate("/login")}>로그인</NeedAuth>
            <NeedAuth onClick={() => navigate("/signup")}>회원가입</NeedAuth>
          </AuthWrapper>
        )}
        {isLoggedIn && (
          <UserLinks>
            <UserLink onClick={() => navigate(`/mypage/${userSeq}`)}>
              {myNickname}'s 마이페이지
            </UserLink>
            <UserLink onClick={() => dispatch(logout())}>로그아웃</UserLink>
          </UserLinks>
        )}
      </Right>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px 0 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const UserLinks = styled.div``;

const LogoImg = styled.img`
  height: 30px;
`;

const ServiceLink = styled(Link)`
  cursor: pointer;
  margin-right: 20px;
  text-decoration: none;
`;

const UserLink = styled.div`
  cursor: pointer;
`;

const AuthWrapper = styled.div``;

const NeedAuth = styled.div`
  cursor: pointer;
`;
