import React from "react";
import styled from "styled-components";

import { useState } from "react";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import LogInButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

import Login from "../../api/Login";

const LogInForm = () => {
  const { id, setId } = useState("");
  const { password, setPassword } = useState("");

  const changeId = (getId) => {
    setId(getId);
  };

  const changePassword = (getPassword) => {
    setPassword(getPassword);
  };

  const tryLogin = () => {
    Login(id, password);
  };

  return (
    <FormWrapper>
      <FormTitle>로그인</FormTitle>
      <FormItem>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          name="id"
          onChange={(e) => changeId(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          onChange={(e) => changePassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      </FormItem>
      <LogInButton onClick={tryLogin}>로그인하기</LogInButton>
      <FormItem>
        <FormLinksWrapper>
          <MyLink>비밀번호 찾기</MyLink>
          <Stick>|</Stick>
          <MyLink>회원가입</MyLink>
        </FormLinksWrapper>
      </FormItem>
    </FormWrapper>
  );
};

export default LogInForm;

const MyLink = styled.div`
  font-size: 0.8rem;
`;

const Stick = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
`;
