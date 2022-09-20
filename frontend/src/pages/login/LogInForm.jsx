import React from "react";
import styled from "styled-components";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import LogInButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

const LogInForm = () => {
  return (
    <FormWrapper>
      <FormTitle>로그인</FormTitle>
      <FormItem>
        <Label htmlFor="email">이메일</Label>
        <Input type="email" id="email" placeholder="이메일을 입력하세요" />
      </FormItem>
      <FormItem>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
        />
      </FormItem>
      <LogInButton>로그인하기</LogInButton>
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
