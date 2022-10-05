import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileImage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const ImageInput = useRef();
  const originImg = useSelector((state) => state.auth.myImageURL);

  const handleChange = () => {
    ImageInput.current.click();
  };

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
          .then(() => toast.success("프로필 사진이 변경되었습니다"))
          .catch(() => toast.error("프로필 사진 변경 실패"));
      })
      .catch(() => toast.error("문제가 발생했습니다"));

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

      <div className="flex flex-col" data-aos="fade-up">
        <div className="w-40 h-40 bg-gray-100 rounded-3xl drop-shadow-md mb-8">
          {imageSrc && (
            <img src={imageSrc} alt="" className="w-40 h-40 rounded-3xl" />
          )}
          {!imageSrc && originImg && (
            <img
              src={`http://j7d201.p.ssafy.io/api/my-file/read/${originImg}`}
              alt=""
              className="w-40 h-40 rounded-3xl"
            />
          )}
        </div>

        <input
          type="file"
          accept=".jpg"
          id="profileImage"
          name="profileImage"
          className="hidden"
          ref={ImageInput}
          onChange={(e) => encodeFileToBase64(e.target.files[0])}
        />

        <div>
          <button
            className="flex text-white bg-amber-400 border-0 py-2 px-8 focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
            onClick={handleChange}
          >
            변경하기
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileImage;
