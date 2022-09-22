import React from "react";
import styled from "styled-components";

import FormTitle from "../../../components/form/FormTitle";
import FormItem from "../../../components/form/FormItem";
import Label from "../../../components/input/Label";
import Input from "../../../components/input/Input";
import FormButton from "../../../components/form/FormButton";

const Password = (props) => {
  return (
    <form>
      <TabTitle>비밀번호 변경</TabTitle>
      <FormItem>
        <Label htmlFor="password1">기존 비밀번호</Label>
        <Input
          type="password"
          id="password1"
          name="password1"
          placeholder="기존 비밀번호를 입력하세요"
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="password2">변경할 비밀번호</Label>
        <Input
          type="password"
          id="password2"
          name="password2"
          placeholder="변경할 비밀번호를 입력하세요"
        />
      </FormItem>
      <FormItem>
        <Label htmlFor="password3">변경할 비밀번호 확인</Label>
        <Input
          type="password"
          id="password3"
          name="password3"
          placeholder="변경할 비밀번호를 한 번 더 입력하세요"
        />
      </FormItem>
      <SubmitButton type="submit">변경하기</SubmitButton>
    </form>
  );
};

export default Password;

const TabTitle = styled(FormTitle)`
  font-size: 1.6rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;

const SubmitButton = styled(FormButton)`
  width: 15rem;
`;
