import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { testLogin } from "../../redux/authSlice";

import FormWrapper from "../../components/form/FormWrapper";
import FormTitle from "../../components/form/FormTitle";
import FormItem from "../../components/form/FormItem";
import LogInButton from "../../components/form/FormButton";
import FormLinksWrapper from "../../components/form/FormLinksWrapper";
import Input from "../../components/input/Input";
import Label from "../../components/input/Label";

// const baseURL = "http://j7d201.p.ssafy.io:8081";
const baseURL = "";
axios.defaults.withCredentials = true;

// "proxy": "http://j7d201.p.ssafy.io:8081"

const LogInForm = () => {
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log(`auth.nickname: ${auth.nickname}`);
    // console.log(`auth.email: ${auth.email}`);
    // console.log("auth: ", auth);

    const url = `${baseURL}/users/login`;
    const data = JSON.stringify({
      userEmail: "ljy1210@ssafy.com",
      userPassword: "1234ljy33",
    });

    axios
      .post(url, data, {
        headers: {
          withCredentials: true,
          accept: "application/json,",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("accessToken", `jwt ${res.data.jwt}`);

        axios.defaults.headers.common["Authorization"] = `jwt ${res.data}`;
      })
      .catch((err) => console.error(err));
  };

  return (
    <form method="post" onSubmit={submitHandler}>
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
        <LogInButton
          type="submit"
          onClick={() =>
            dispatch(testLogin({ nickname: "test", email: "email" }))
          }
        >
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
