import React from "react";
import styled from "styled-components";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import SignUpButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

const SignUpForm = () => {
  return (
    <FormWrapper>
      <FormTitle>회원가입</FormTitle>
      <FormItem>
        <Label htmlFor="email">이메일</Label>
        <Input type="email" id="email" placeholder="이메일을 입력하세요" />
      </FormItem>
      <FormItem>
        <Label htmlFor="nickname">닉네임</Label>
        <Input type="text" id="nickname" placeholder="닉네임을 입력하세요" />
      </FormItem>
      <FormItem>
        <Label htmlFor="password1">비밀번호</Label>
        <Input
          type="password"
          id="password1"
          placeholder="비밀번호를 입력하세요"
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="password2">비밀번호 확인</Label>
        <Input
          type="password"
          id="password2"
          placeholder="비밀번호를 한번 더 입력하세요"
        />
      </FormItem>
      <SignUpButton>회원가입하기</SignUpButton>
      <FormItem>
        <FormLinksWrapper>
          <MyLink>로그인하기</MyLink>
        </FormLinksWrapper>
      </FormItem>
    </FormWrapper>
  );
};

export default SignUpForm;

const MyLink = styled.div`
  font-size: 0.8rem;
`;
