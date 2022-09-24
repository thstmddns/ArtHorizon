import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import LogInButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

// "ljy1210@ssafy.com"
// "1234ljy33"

const LogInForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = JSON.stringify({
      userEmail: email,
      userPassword: password,
    });
    dispatch(login(loginData));
    setEmail("");
    setPassword("");
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <FormWrapper>
        <FormTitle>로그인</FormTitle>
        <FormItem>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <LogInButton type="submit" onClick={submitHandler}>
          로그인하기
        </LogInButton>
        <FormItem>
          <FormLinksWrapper>
            <MyLink>비밀번호 찾기</MyLink>
            <Stick>|</Stick>
            <MyLink>회원가입</MyLink>
          </FormLinksWrapper>
        </FormItem>
      </FormWrapper>
    </form>
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
