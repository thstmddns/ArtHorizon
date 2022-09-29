import React from "react";
import { useRef } from "react";
import { useState } from "react";

const Scent = () => {
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
    <div>
      <div>
        <div>당신의 그림은 어떤 향일까요?</div>
        {image && <img src={image} alt="선택한 이미지" />}
        <input
          type="file"
          ref={ImageInput}
          onChange={(e) => updateImg(e.target.files[0])}
        />
        <button onClick={handleChange}>이미지 선택하기</button>
      </div>
      {/* line */}
      <div></div>
      <div>
        <div>{scent}</div>
        {/* 여기 이제 향 별 대표 이미지 들어갈 예정 */}
        {scent !== "당신의 향은?" && (
          <div>
            <div>같은 향을 가진 그림</div>
            {/* 비슷한 이미지 호출(api가 있나...?) */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scent;
