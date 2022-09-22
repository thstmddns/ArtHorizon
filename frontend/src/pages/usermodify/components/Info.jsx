import React from "react";
import styled from "styled-components";

import FormTitle from "../../../components/form/FormTitle";
import FormItem from "../../../components/form/FormItem";
import Label from "../../../components/input/Label";
import Input from "../../../components/input/Input";
import Textarea from "../../../components/input/Textarea";
import FormButton from "../../../components/form/FormButton";

const Info = (props) => {
  return (
    <form>
      <TabTitle>기본정보 변경</TabTitle>
      <FormItem>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="변경할 닉네임을 입력하세요"
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="statusMessage">상태 메시지</Label>
        <Textarea
          id="statusMessage"
          name="statusMessage"
          placeholder="상태 메시지를 입력하세요"
          rows="7"
        ></Textarea>
      </FormItem>
      <SubmitButton type="submit">변경하기</SubmitButton>
    </form>
  );
};

export default Info;

const TabTitle = styled(FormTitle)`
  font-size: 1.6rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;

const SubmitButton = styled(FormButton)`
  width: 15rem;
`;
