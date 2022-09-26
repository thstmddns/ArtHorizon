import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { changeType } from "../../../redux/authSlice";

const Convert = (props) => {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(changeType());
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <TabTitle>화가로 전환</TabTitle>
      {/* <FormItem>
        <Label htmlFor="toArtist">화가로..</Label>
        <Input
          type="text"
          id="toArtist"
          name="toArtist"
          placeholder="변경할 닉네임을 입력하세요"
        />
      </FormItem> */}
      <button>테스트버튼</button>
    </form>
  );
};

export default Convert;

const TabTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 60px;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;
