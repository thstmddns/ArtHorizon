import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { changeProfile } from "../../../redux/authSlice";

const Info = () => {
  const dispatch = useDispatch();
  const originNickname = useSelector((state) => state.auth.myNickname);
  const originDesc = useSelector((state) => state.auth.myDesc);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setNickname(originNickname);
    setDescription(originDesc);
  }, [dispatch, originNickname, originDesc]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      toast.warn("닉네임을 입력하세요");
      return;
    }

    const profileData = JSON.stringify({
      userNickname: nickname,
      userDesc: description,
    });

    dispatch(changeProfile(profileData))
      .unwrap()
      .then(() => toast.success("성공적으로 변경되었습니다"))
      .catch(() => toast.error("변경에 실패했습니다"));
  };

  return (
    <React.Fragment>
      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        기본 정보 변경
      </div>
      <form method="post" onSubmit={submitHandler} data-aos="fade-up">
        <div className="relative mb-4">
          <label htmlFor="nickname" className="leading-7 text-gray-900">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
            placeholder="닉네임을 입력하세요"
            defaultValue={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="description" className="leading-7 text-gray-900">
            상태 메시지
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-6 h-32 transition"
            placeholder="상태 메시지를 입력하세요"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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

export default Info;
