import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// import { FaUserCircle } from "react-icons/fa";

const Navigation = () => {
  const isLogin = true;
  return (
    <Navbar>
      <Leftdiv>Art Horizon</Leftdiv>
      <Rowul>
        <Sepli>
          <StyledLink to="/pieces">작품목록</StyledLink>
        </Sepli>
        <Sepli>
          <StyledLink to="/styletransfer">화풍바꾸기</StyledLink>
        </Sepli>
        <Sepli>
          <StyledLink to="/whatkind">그림의향</StyledLink>
        </Sepli>
        <Sepli>
          <StyledLink to="/help">공지사항</StyledLink>
        </Sepli>
      </Rowul>
      {!isLogin ? (
        <Rightdiv>
          <Style2Link to="/registpiece">작품등록</Style2Link>
          <Style2Link to="/mypage">마이페이지</Style2Link>
          <Style2Link to="/usermodify">회원정보수정</Style2Link>
          {/* onclick시 로그아웃하도록 설정 */}
          <Style2Link>로그아웃</Style2Link>
        </Rightdiv>
      ) : (
        <Rightdiv>
          <Style2Link to="/login">로그인</Style2Link>
          <Style2Link to="/signup">회원가입</Style2Link>
        </Rightdiv>
      )}
    </Navbar>
  );
};

export default Navigation;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 40px;
`;

const Rowul = styled.ul`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: 20px;
`;

const Sepli = styled.li`
  margin: 0 5px;
`;

const Leftdiv = styled.div`
  margin-left: 10px;
`;

const Rightdiv = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  margin: 0 2px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Style2Link = styled(Link)`
  text-decoration: none;
  font-size: 0.5em;
  margin: 0 2px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

// const DropdownLi = styled.li`
//   width: calc(var(--nav-size) * 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transition: all;
// `;
