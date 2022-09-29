import React from "react";
import { useRef } from "react";
import { useState } from "react";

const TailScent = () => {
  const [image, setImage] = useState("");
  const [scent, setScent] = useState("당신의 향은?");
  const ImageInput = useRef();

  const handleChange = () => {
    ImageInput.current.click();
    // AI에 Scent api 호출
  };

  const updateImg = (file) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container flex flex-wrap px-5 pt-24 pb-10 mx-auto items-center justify-center">
        <div className="flex flex-col items-center justify-center min-w-[50%]">
          <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            당신의 그림은 어떤 향일까요?
          </h2>
          {image ? (
            <img
              className="mt-10 max-w-xl max-h-xl"
              src={image}
              alt="선택한 이미지"
            />
          ) : (
            <div className="rounded-md box-border h-96 w-96 p-4 border-4 bg-gray-500 mt-10"></div>
          )}
          <input
            className="hidden"
            type="file"
            accept="image/jpeg"
            ref={ImageInput}
            onChange={(e) => updateImg(e.target.files[0])}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-10"
            type="button"
            onClick={handleChange}
          >
            이미지 선택하기
          </button>
        </div>
        {scent !== "당신의 향은?" && (
          <div className="border-l-4 border-indigo-500 w-1/2">
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {scent}
            </h2>
            {/* 여기 이제 향 별 대표 이미지 들어갈 예정 */}
            <div>
              <div>같은 향을 가진 그림</div>
              {/* 비슷한 이미지 호출(api가 있나...?) */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TailScent;
