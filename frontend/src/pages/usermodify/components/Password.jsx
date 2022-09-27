import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

import { changePassword } from "../../../redux/authSlice";

// import FormTitle from "../../../components/form/FormTitle";
// import FormItem from "../../../components/form/FormItem";
// import Label from "../../../components/input/Label";
// import Input from "../../../components/input/Input";
// import FormButton from "../../../components/form/FormButton";

const Password = (props) => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [errorPassword1Message, setErrorPassword1Message] = useState("");
  const [errorPassword2Message, setErrorPassword2Message] = useState("");
  const [errorPassword3Message, setErrorPassword3Message] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorPassword1Message("");
    setErrorPassword2Message("");
    setErrorPassword3Message("");
    let hasError = false;

    if (!password1.trim()) {
      setErrorPassword1Message("기존 비밀번호를 입력하세요");
      hasError = true;
    }
    if (!password2.trim()) {
      setErrorPassword2Message("변경할 비밀번호를 입력하세요");
      hasError = true;
    }
    if (!password3.trim()) {
      setErrorPassword3Message("변경할 비밀번호를 한 번 더 입력하세요");
      hasError = true;
    }
    if (password2 !== password3) {
      setErrorPassword2Message("비밀번호가 일치하지 않습니다");
      setErrorPassword3Message("비밀번호가 일치하지 않습니다");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const passwordData = JSON.stringify({
      userPassword: password1,
      changeUserPassword: password2,
    });

    setPassword1("");
    setPassword2("");
    setPassword3("");
    dispatch(changePassword(passwordData));
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <TabTitle>비밀번호 변경</TabTitle>
      <FormControl>
        <Label htmlFor="password1">기존 비밀번호</Label>
        <Input
          type="password"
          id="password1"
          name="password1"
          placeholder="기존 비밀번호를 입력하세요"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <ErrorMessage>{errorPassword1Message}</ErrorMessage>
      </FormControl>
      <FormControl>
        <Label htmlFor="password2">변경할 비밀번호</Label>
        <Input
          type="password"
          id="password2"
          name="password2"
          placeholder="변경할 비밀번호를 입력하세요"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <ErrorMessage>{errorPassword2Message}</ErrorMessage>
      </FormControl>
      <FormControl>
        <Label htmlFor="password3">변경할 비밀번호 확인</Label>
        <Input
          type="password"
          id="password3"
          name="password3"
          placeholder="변경할 비밀번호를 한 번 더 입력하세요"
          value={password3}
          onChange={(e) => setPassword3(e.target.value)}
        />
        <ErrorMessage>{errorPassword3Message}</ErrorMessage>
      </FormControl>
      <Button type="submit">변경하기</Button>
    </form>
  );
};

export default Password;

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
  width: 15rem;
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

const TabTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 60px;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;
