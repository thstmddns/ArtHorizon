import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signup } from "../../redux/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorNicknameMessage, setErrorNicknameMessage] = useState("");
  const [errorPassword1Message, setErrorPassword1Message] = useState("");
  const [errorPassword2Message, setErrorPassword2Message] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorEmailMessage("");
    setErrorNicknameMessage("");
    setErrorPassword1Message("");
    setErrorPassword2Message("");
    let hasError = false;

    if (!email.trim()) {
      setErrorEmailMessage("이메일을 입력하세요");
      hasError = true;
    }
    if (!nickname.trim()) {
      setErrorNicknameMessage("닉네임을 입력하세요");
      hasError = true;
    }
    if (!password1.trim()) {
      setErrorPassword1Message("비밀번호를 입력하세요");
      hasError = true;
    }
    if (!password2.trim()) {
      setErrorPassword2Message("비밀번호를 한번 더 입력하세요");
      hasError = true;
    }
    if (password1 !== password2) {
      setErrorPassword1Message("");
      setErrorPassword2Message("비밀번호가 일치하지 않습니다");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // const signupData = JSON.stringify({
    //   userEmail: "test@test.com",
    //   userPassword: "test",
    //   userNickname: "테스트",
    //   userType: "N",
    // });

    const signupData = JSON.stringify({
      userEmail: email,
      userPassword: password1,
      userNickname: nickname,
      userType: "N",
    });

    console.log("signupData: ", signupData);

    setEmail("");
    setNickname("");
    setPassword1("");
    setPassword2("");
    dispatch(signup(signupData));
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <FormWrapper>
        <FormTitle>회원가입</FormTitle>

        {/* Email */}
        <FormControl>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage>{errorEmailMessage}</ErrorMessage>
        </FormControl>

        {/* Nickname */}
        <FormControl>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하세요"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <ErrorMessage>{errorNicknameMessage}</ErrorMessage>
        </FormControl>

        {/* Password 1 */}
        <FormControl>
          <Label htmlFor="password1">비밀번호</Label>
          <Input
            type="password"
            id="password1"
            placeholder="비밀번호를 입력하세요"
            required
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <ErrorMessage>{errorPassword1Message}</ErrorMessage>
        </FormControl>

        {/* Password 2 */}
        <FormControl>
          <Label htmlFor="password2">비밀번호 확인</Label>
          <Input
            type="password"
            id="password2"
            placeholder="비밀번호를 한번 더 입력하세요"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <ErrorMessage>{errorPassword2Message}</ErrorMessage>
        </FormControl>

        <Button onClick={submitHandler}>회원가입하기</Button>

        <FormLinksWrapper>
          <MyLink>
            <Link to={"/login"}>로그인하기</Link>
          </MyLink>
        </FormLinksWrapper>
      </FormWrapper>
    </form>
  );
};

export default SignUpForm;

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
  margin-bottom: 15px;
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
