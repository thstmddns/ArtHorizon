import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { changeType, getUser } from "../../../redux/authSlice";

const Convert = () => {
  const dispatch = useDispatch();
  const myType = useSelector((state) => state.auth.myUserType);

  const toggleHandler = () => {
    if (myType === "N") {
      dispatch(changeType());
      dispatch(getUser());
      toast.success("성공적으로 화가로 전환했습니다.");
    }
  };

  return (
    <React.Fragment>
      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        화가로 전환
      </div>
      <form data-aos="fade-up">
        <label
          htmlFor="Toggle1"
          className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
        >
          <span>일반</span>
          <span className="relative">
            {myType === "A" && (
              <input
                id="Toggle1"
                type="checkbox"
                className="hidden peer"
                checked
                onChange={toggleHandler}
              />
            )}
            {myType === "N" && (
              <input
                id="Toggle1"
                type="checkbox"
                className="hidden peer"
                onChange={toggleHandler}
              />
            )}
            <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 peer-checked:bg-sky-400 transition"></div>
            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white transition"></div>
          </span>
          <span>화가</span>
        </label>
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
