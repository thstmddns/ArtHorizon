import React, { useState } from "react";
import styled from "styled-components";

import Info from "./components/Info";
import Password from "./components/Password";
import ProfileImage from "./components/ProfileImage";
import Convert from "./components/Convert";
import Withdrawal from "./components/Withdrawal";

const UserModify = () => {
  const [selectedTab, setSelectedTab] = useState("기본정보 변경");

  // switch (selectedTab) {
  //   case "기본정보 변경":
  //     break;
  //   case "비밀번호 변경":
  //     break;
  //   case "프사 변경":
  //     break;
  //   case "화가로 전환":
  //     break;
  //   case "회원 탈퇴":
  //     break;
  //   default:
  //     break;
  // }

  return (
    <Container>
      <Left>
        <TabLinks>
          <TabLink
            isSelected={"기본정보 변경" === selectedTab}
            onClick={() => setSelectedTab("기본정보 변경")}
          >
            기본정보 변경
          </TabLink>
          <TabLink
            isSelected={"비밀번호 변경" === selectedTab}
            onClick={() => setSelectedTab("비밀번호 변경")}
          >
            비밀번호 변경
          </TabLink>
          <TabLink
            isSelected={"프사 변경" === selectedTab}
            onClick={() => setSelectedTab("프사 변경")}
          >
            프사 변경
          </TabLink>
          <TabLink
            isSelected={"화가로 전환" === selectedTab}
            onClick={() => setSelectedTab("화가로 전환")}
          >
            화가로 전환
          </TabLink>
          <TabLink
            isSelected={"회원 탈퇴" === selectedTab}
            onClick={() => setSelectedTab("회원 탈퇴")}
          >
            회원 탈퇴
          </TabLink>
        </TabLinks>
      </Left>
      <Right>
        <TabContainer>
          {selectedTab === "기본정보 변경" && <Info />}
          {selectedTab === "비밀번호 변경" && <Password />}
          {selectedTab === "프사 변경" && <ProfileImage />}
          {selectedTab === "화가로 전환" && <Convert />}
          {selectedTab === "회원 탈퇴" && <Withdrawal />}
        </TabContainer>
      </Right>
    </Container>
  );
};

export default UserModify;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Left = styled.div`
  width: 25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const TabLinks = styled.div`
  margin-top: 60px;
`;

const TabLink = styled.div`
  font-size: 1.5rem;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  background-color: ${(props) => (props.isSelected ? "#f2f2f0" : "ffffff")};
  cursor: pointer;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabContainer = styled.div`
  width: 80%;
  height: 80%;
  align-items: start;
  border-radius: 10px;
  padding: 30px 50px 30px 50px;
  border: 1px solid #d1d7de;
  background-color: #f9f9f7;
`;
