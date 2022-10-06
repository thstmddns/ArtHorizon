import React, { useState } from "react";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import Info from "./components/Info";
import Password from "./components/Password";
import ProfileImage from "./components/ProfileImage";
import Convert from "./components/Convert";
import Withdrawal from "./components/Withdrawal";

const UserModify = () => {
  const [selectedTab, setSelectedTab] = useState("기본정보 변경");

  return (
    <React.Fragment>
      <NavBar />
      <section
        className="border-solid border-gray-50 border-b-2"
        style={{ marginTop: "71px", minHeight: "87.5vh" }}
      >
        <div className="flex container py-24 mx-auto" data-aos="fade-in">
          {/* 탭 */}
          <div className="flex flex-col mr-20">
            <div
              key={"1"}
              className={`flex cursor-pointer w-40 px-5 py-4 border-solid border-r-4 text-gray-600 border-gray-200 transition ${
                selectedTab === "기본정보 변경" && "font-bold border-sky-400"
              }`}
              onClick={() => setSelectedTab("기본정보 변경")}
            >
              기본정보 변경
            </div>
            <div
              key={"2"}
              className={`flex cursor-pointer w-40 px-5 py-4 border-solid border-r-4 text-gray-600 border-gray-200 transition ${
                selectedTab === "비밀번호 변경" && "font-bold border-sky-400"
              }`}
              onClick={() => setSelectedTab("비밀번호 변경")}
            >
              비밀번호 변경
            </div>
            <div
              key={"3"}
              className={`flex cursor-pointer w-40 px-5 py-4 border-solid border-r-4 text-gray-600 border-gray-200 transition ${
                selectedTab === "프사 변경" && "font-bold border-sky-400"
              }`}
              onClick={() => setSelectedTab("프사 변경")}
            >
              프사 변경
            </div>
            <div
              key={"4"}
              className={`flex cursor-pointer w-40 px-5 py-4 border-solid border-r-4 text-gray-600 border-gray-200 transition ${
                selectedTab === "화가로 전환" && "font-bold border-sky-400"
              }`}
              onClick={() => setSelectedTab("화가로 전환")}
            >
              화가로 전환
            </div>
            <div
              key={"5"}
              className={`flex cursor-pointer w-40 px-5 py-4 border-solid border-r-4 text-gray-600 border-gray-200 transition ${
                selectedTab === "회원 탈퇴" && "font-bold border-sky-400"
              }`}
              onClick={() => setSelectedTab("회원 탈퇴")}
            >
              회원 탈퇴
            </div>
          </div>

          {/* 폼 */}
          <div className="container mx-auto">
            {selectedTab === "기본정보 변경" && <Info />}
            {selectedTab === "비밀번호 변경" && <Password />}
            {selectedTab === "프사 변경" && <ProfileImage />}
            {selectedTab === "화가로 전환" && <Convert />}
            {selectedTab === "회원 탈퇴" && <Withdrawal />}
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default UserModify;
