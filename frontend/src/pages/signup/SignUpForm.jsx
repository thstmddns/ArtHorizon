import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/authSlice";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import FormErrorMessage from "../../components/form/FormErrorMessage";
import SignUpButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

const SignUpForm = () => {
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("");
  // const [password1, setPassword1] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const signupData = JSON.stringify({
      userEmail: "test@test.com",
      userPassword: "test",
      userNickname: "테스트",
      userType: "N",
    });
    dispatch(signup(signupData));
    // setEmail("");
    // setPassword("");
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <FormWrapper>
        <FormTitle>회원가입</FormTitle>
        <FormItem style={{ marginBottom: "15px" }}>
          <Label htmlFor="email">이메일</Label>
          <Input type="email" id="email" placeholder="이메일을 입력하세요" />
          <FormErrorMessage>유효하지 않은 이메일입니다</FormErrorMessage>
        </FormItem>
        <FormItem style={{ marginBottom: "15px" }}>
          <Label htmlFor="nickname">닉네임</Label>
          <Input type="text" id="nickname" placeholder="닉네임을 입력하세요" />
          <FormErrorMessage>유효하지 않은 닉네임입니다</FormErrorMessage>
        </FormItem>
        <FormItem style={{ marginBottom: "15px" }}>
          <Label htmlFor="password1">비밀번호</Label>
          <Input
            type="password"
            id="password1"
            placeholder="비밀번호를 입력하세요"
          />
          <FormErrorMessage>비밀번호 조건이 맞지 않습니다</FormErrorMessage>
        </FormItem>
        <FormItem style={{ marginBottom: "15px" }}>
          <Label htmlFor="password2">비밀번호 확인</Label>
          <Input
            type="password"
            id="password2"
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <FormErrorMessage>비밀번호가 일치하지 않습니다</FormErrorMessage>
        </FormItem>
        <SignUpButton onClick={submitHandler}>회원가입하기</SignUpButton>
        <FormItem>
          <FormLinksWrapper>
            <MyLink>로그인하기</MyLink>
          </FormLinksWrapper>
        </FormItem>
      </FormWrapper>
    </form>
  );
};

export default SignUpForm;

const MyLink = styled.div`
  font-size: 0.8rem;
`;
