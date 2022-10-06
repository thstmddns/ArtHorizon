import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { changePassword } from "../../../redux/authSlice";

const Password = () => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!password1.trim()) {
      toast.warn("기존 비밀번호를 입력하세요");
      return;
    }
    if (!password2.trim()) {
      toast.warn("변경할 비밀번호를 입력하세요");
      return;
    }
    if (!password3.trim()) {
      toast.warn("변경할 비밀번호를 한 번 더 입력하세요");
      return;
    }
    if (password2 !== password3) {
      toast.warn("비밀번호가 일치하지 않습니다");
      return;
    }

    const passwordData = JSON.stringify({
      userPassword: password1,
      changeUserPassword: password2,
    });

    setPassword1("");
    setPassword2("");
    setPassword3("");
    dispatch(changePassword(passwordData))
      .unwrap()
      .then(() => toast.success("비밀번호 변경에 성공했습니다."))
      .catch(() => toast.error("비밀번호 변경에 실패했습니다"));
  };

  return (
    <React.Fragment>
      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        비밀번호 변경
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="password2" className="leading-7 text-gray-900">
            변경할 비밀번호
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
            placeholder="변경할 비밀번호를 입력하세요"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="password3" className="leading-7 text-gray-900">
            변경할 비밀번호 확인
          </label>
          <input
            type="password"
            id="password3"
            name="password3"
            className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
            placeholder="변경할 비밀번호를 입력하세요"
            value={password3}
            onChange={(e) => setPassword3(e.target.value)}
          />
        </div>

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

export default Password;
