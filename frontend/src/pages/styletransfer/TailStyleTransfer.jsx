import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import baseurl from "../../api/BaseUrl";

const TailStyleTransfer = () => {
  const [targetImg, setTargetImg] = useState("");
  const [sourceImg, setSourceImg] = useState("");
  const [resultImg, setResultImg] = useState("");

  // fileName을 여기 넣어놓으시오
  const url = "http://j7d201.p.ssafy.io/api/my-file/read/";
  const imageNames = [
    "1_Amedeo Modigliani_The Servant Girl.jpg",
    "105_Diego Rivera_Night of the Rich.jpg",
    "380_Peter Paul Rubens_Marchesa Brigida Spinola-Doria.jpg",
    "600_Sandro Botticelli_Portrait of Dante.jpg",
    "852_Rembrandt_Landscape with the Good Samaritan.jpg",
    "942_Camille Pissarro_Boulevard Montmartre Afternoon, in the Rain.jpg",
  ];

  const targetInput = useRef();

  const targetSelect = () => {
    targetInput.current.click();
  };

  const updateTarget = async (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        const encode = reader.result;
        setTargetImg(encode);
        resolve();
      };
    });
  };

  const updateSource = (imageName) => {
    setSourceImg(url + imageName);
    console.log(url + imageName);
  };

  const aiTransfer = () => {
    const byteString = atob(targetImg.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg",
    });
    const file = new File([blob], "image.jpg");
    const url = "http://127.0.0.1:8000/medici/nst";
    const formData = new FormData();
    formData.append("filed", file);
    formData.append("src", sourceImg);
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        responseType: "blob",
      },
    };

    axios.post(url, formData, config).then((res) => {
      console.log(res);
      setResultImg(res.data);
    });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container flex flex-wrap px-5 pt-24 pb-10 mx-auto items-center">
        <div className="flex flex-col items-center justify-center w-1/2">
          <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Style Transfer할 사진을 골라주세요
          </h2>
          {targetImg ? (
            <img
              className="mt-10 max-w-xl max-h-xl"
              src={targetImg}
              alt="targetImage"
            />
          ) : (
            <div className="box-border h-96 w-96 p-4 border-4 bg-gray-500 mt-10 rounded-md"></div>
          )}
          <div className="mt-10">
            <input
              className="hidden"
              type="file"
              accept="image/jpeg"
              ref={targetInput}
              onChange={(e) => updateTarget(e.target.files[0])}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="button"
              onClick={targetSelect}
            >
              이미지 선택하기
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            어떤 작품의 스타일로 바꾸고 싶으신가요?
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {imageNames.map((imageName) => {
              return (
                <div onClick={() => updateSource(imageName)} key={imageName}>
                  <img src={url + imageName} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => aiTransfer()}
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Style Transfer
        </button>
        {resultImg && (
          <div>
            {/* <img src={`data:image/jpeg;base64,${resultImg}`} alt="result" /> */}
            <img src={resultImg} alt="result" />
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
              다운로드 하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TailStyleTransfer;
