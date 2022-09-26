import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { quit } from "../../../redux/authSlice";

import FormTitle from "../../../components/form/FormTitle";
import FormItem from "../../../components/form/FormItem";
import Label from "../../../components/input/Label";
import Input from "../../../components/input/Input";
import FormButton from "../../../components/form/FormButton";

const Withdrawal = (props) => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(quit());
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <TabTitle>회원 탈퇴</TabTitle>
      {/* <FormItem>
        <Label htmlFor="password">기존 비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="기존 비밀번호를 입력하세요"
        />
      </FormItem> */}
      <SubmitButton type="submit">회원 탈퇴하기</SubmitButton>
    </form>
  );
};

export default Withdrawal;

const TabTitle = styled(FormTitle)`
  font-size: 1.6rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;

const SubmitButton = styled(FormButton)`
  width: 15rem;
`;
