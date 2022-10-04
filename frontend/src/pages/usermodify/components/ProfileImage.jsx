import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BaseLabel from "../../../components/input/Label";
import BaseInput from "../../../components/input/Input";
import axios from "axios";

const ProfileImage = () => {
  const [imageSrc, setImageSrc] = useState("");

  const token = localStorage.getItem("access-token").slice(4);

  const encodeFileToBase64 = (fileBlob) => {
    // 이미지 서버 등록
    const url = "http://j7d201.p.ssafy.io/api/my-file/profile";
    const formData = new FormData();
    formData.append("multipartFile", fileBlob);
    const config = {
      headers: {
        jwt: token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        const getString = res.data;
        console.log(getString);
        const url2 = "http://j7d201.p.ssafy.io/api/users/profile-img";
        const data = JSON.stringify({
          userImg: getString,
        });
        const config2 = {
          headers: {
            "content-type": "application/json",
            jwt: token,
          },
        };
        axios
          .put(url2, data, config2)
          .then(() => toast.success("프로필 사진이 변경되었습니다."))
          .catch(() => toast.error("프로필 사진 변경에 실패했습니다."));
      })
      .catch((err) => {
        console.error(err);
        alert("문제가 발생했습니다 다시 시도해주십시오");
      });

    // 프론트단 이미지 출력
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <React.Fragment>
      <div
        className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
        data-aos="fade-left"
      >
        프로필 사진 변경
      </div>

      {/* <ImageBox>{imageSrc && <Img src={imageSrc} alt="" />}</ImageBox>
      <Label htmlFor="profileImage">
        <Button>변경하기</Button>
      </Label>
      <Input
        type="file"
        accept=".jpg"
        id="profileImage"
        name="profileImage"
        onChange={(e) => encodeFileToBase64(e.target.files[0])}
      /> */}

      <div className="flex flex-col" data-aos="fade-up">
        <div className="w-40 h-40 bg-gray-100 rounded-3xl drop-shadow-md mb-8">
          {imageSrc && (
            <img src={imageSrc} alt="" className="w-40 h-40 rounded-3xl" />
          )}
        </div>
        <label htmlFor="profileImage">
          <button className="flex text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition">
            변경하기
          </button>
        </label>
        <input
          type="file"
          accept=".jpg"
          id="profileImage"
          name="profileImage"
          style={{ display: "none" }}
          onChange={(e) => encodeFileToBase64(e.target.files[0])}
        />
      </div>
    </React.Fragment>
  );
};

export default ProfileImage;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  border: 1px solid #888383;
  background-color: #f5f5f5;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  // overflow: hidden;
`;

const Label = styled(BaseLabel)`
  margin-bottom: 0px;
  margin-left: 20px;
`;

const Input = styled(BaseInput)`
  display: none;
`;

const Button = styled.div`
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
`;
