import React from "react";
import styled from "styled-components";

const LoginForm = () => {
  return (
    <Wrapper>
      <Title>로그인</Title>
      <FormItem>
        <InputLabel htmlFor="email">이메일</InputLabel>
        <Input type="email" id="email" placeholder="이메일을 입력하세요" />
      </FormItem>
      <FormItem>
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
        />
      </FormItem>
      <LoginButton>로그인하기</LoginButton>
      <FormItem>
        <LinksWrapper>
          <MyLink>비밀번호 찾기</MyLink>
          <Between>|</Between>
          <MyLink>회원가입</MyLink>
        </LinksWrapper>
      </FormItem>
    </Wrapper>
  );
};

export default LoginForm;

const Wrapper = styled.div`
  width: 420px;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f9f9f7;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 60px;
`;

const FormItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const InputLabel = styled.label`
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: bold;
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

const Button = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
`;

const LoginButton = styled(Button)`
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

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyLink = styled.div`
  font-size: 0.8rem;
`;

const Between = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
`;
