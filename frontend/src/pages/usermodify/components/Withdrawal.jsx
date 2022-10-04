import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { quit } from "../../../redux/authSlice";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(quit());
    toast.success("성공적으로 회원 탈퇴했습니다.");
    navigate("/", { replace: true });
  };

  return (
    <React.Fragment>
      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        회원 탈퇴
      </div>
      <form method="post" onSubmit={submitHandler} data-aos="fade-up">
        <div className="flex justify-start">
          <button
            type="submit"
            className="flex text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
          >
            회원 탈퇴하기
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Withdrawal;
