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
    <React.Fragment>
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

      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        화가로 전환
      </div>
      <form method="post" onSubmit={submitHandler} data-aos="fade-up">
        <div className="relative mb-4">
          <label htmlFor="password1" className="leading-7 text-gray-900">
            기존 비밀번호
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
            placeholder="기존 비밀번호를 입력하세요"
          />
        </div>

        <label
          for="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
        >
          <span>Left</span>
          <span className="relative">
            <input id="Toggle1" type="checkbox" className="hidden peer" />
            <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400"></div>
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
          </span>
          <span>Right</span>
        </label>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
          >
            변경하기
          </button>
        </div>
      </form>
    </React.Fragment>
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
