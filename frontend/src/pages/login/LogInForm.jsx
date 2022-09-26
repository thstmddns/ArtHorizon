import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login, getUser } from "../../redux/authSlice";

const LogInForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorEmailMessage("");
    setErrorPasswordMessage("");

    if (!email.trim() && !password.trim()) {
      setErrorEmailMessage("이메일을 입력하세요");
      setErrorPasswordMessage("비밀번호를 입력하세요");
      return;
    } else if (!email.trim()) {
      setErrorEmailMessage("이메일을 입력하세요");
      return;
    } else if (!password.trim()) {
      setErrorPasswordMessage("비밀번호를 입력하세요");
      return;
    }

    const loginData = JSON.stringify({
      userEmail: email,
      userPassword: password,
    });

    setEmail("");
    setPassword("");
    dispatch(login(loginData));
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <FormWrapper>
        <FormTitle>로그인</FormTitle>

        {/* Email */}
        <FormControl style={{ marginBottom: "15px" }}>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage>{errorEmailMessage}</ErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl style={{ marginBottom: "15px" }}>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage>{errorPasswordMessage}</ErrorMessage>
        </FormControl>

        <Button type="submit" onClick={submitHandler}>
          로그인하기
        </Button>

        <FormLinksWrapper>
          <MyLink>비밀번호 찾기</MyLink>
          <Stick>|</Stick>
          <MyLink>
            <Link to={"/signup"}>회원가입</Link>
          </MyLink>
        </FormLinksWrapper>
      </FormWrapper>
    </form>
  );
};

export default LogInForm;

const FormWrapper = styled.div`
  width: 420px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f9f9f7;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 60px;
`;

const FormControl = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Input = styled.input`
  height: 2rem;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  &::placeholder {
    color: #d9d9d9;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  height: 20px;
  display: inline-flex;
  align-items: center;
  margin-left: 12px;
  color: #db5858;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  width: 100%;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
`;

const FormLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyLink = styled.div`
  font-size: 0.8rem;
`;

const Stick = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
`;
