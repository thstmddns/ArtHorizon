import React from "react";
import styled from "styled-components";

import FormTitle from "../../../components/form/FormTitle";
import FormItem from "../../../components/form/FormItem";
import Label from "../../../components/input/Label";
import Input from "../../../components/input/Input";

const Convert = (props) => {
  return (
    <form>
      <TabTitle>화가로 전환</TabTitle>
      <FormItem>
        <Label htmlFor="toArtist">화가로..</Label>
        <Input
          type="text"
          id="toArtist"
          name="toArtist"
          placeholder="변경할 닉네임을 입력하세요"
        />
      </FormItem>
    </form>
  );
};

export default Convert;

const TabTitle = styled(FormTitle)`
  font-size: 1.6rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;
