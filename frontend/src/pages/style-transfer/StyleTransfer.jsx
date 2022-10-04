import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

import NavBar from "../../components/NavBar";

// fileName을 여기 넣어놓으시오
const url = "http://j7d201.p.ssafy.io/api/my-file/read/";
const imageNames = [
  "150_Diego Rivera_Evening Twilight at Acapulco.jpg",
  "935_Camille Pissarro_The Roundelay.jpg",
  "761_Henri Matisse_Fruit and Coffeepot.jpg",
  "461_Francisco Goya_Dont scream stupid.jpg",
  "267_Mikhail Vrubel_Pan.jpg",
  "618_Caravaggio_The Lute Player.jpg",
];

const initialTestImages = [
  {
    imgName: "150_Diego Rivera_Evening Twilight at Acapulco.jpg",
    isSelected: false,
  },
  {
    imgName: "935_Camille Pissarro_The Roundelay.jpg",
    isSelected: false,
  },
  {
    imgName: "761_Henri Matisse_Fruit and Coffeepot.jpg",
    isSelected: false,
  },
  {
    imgName: "461_Francisco Goya_Dont scream stupid.jpg",
    isSelected: false,
  },
  {
    imgName: "267_Mikhail Vrubel_Pan.jpg",
    isSelected: false,
  },
  {
    imgName: "618_Caravaggio_The Lute Player.jpg",
    isSelected: false,
  },
];

const StyleTransfer = () => {
  const [targetImg, setTargetImg] = useState("");
  const [sourceImg, setSourceImg] = useState("");
  const [resultImg, setResultImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImgName, setSelectedImgName] = useState("");

  const targetInput = useRef();

  const [testImages, setTestImages] = useState(initialTestImages);

  const targetSelect = () => {
    targetInput.current.click();
  };

  const updateTarget = async (file) => {
    // console.log(file);
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
    // console.log(url + imageName);
  };

  const aiTransfer = () => {
    setIsLoading(true);
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
    // const url = "http://127.0.0.1:8000/medici/nst";
    const url = "http://j7d201.p.ssafy.io:8000/medici/nst";

    const formData = new FormData();
    formData.append("filed", file);
    formData.append("src", sourceImg);
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        withCredentials: true,
        crossDomain: true,
        credentials: "include",
        // responseType: "blob",
      },
    };

    axios
      .post(url, formData, config)
      .then((res) => {
        // console.log(res.data);
        // console.log(decodeURIComponent(atob(res.data)));
        const result = res.data;
        setResultImg(result);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const downloadImg = useCallback((resultImg) => {
    const link = document.createElement("a");
    link.href = "data:application/octet-stream;base64," + resultImg;
    link.download = "styletransfer.jpg";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <section
        className="text-gray-600 body-font border-solid border-gray-50 border-b-2"
        style={{ marginTop: "71px" }}
      >
        <div className="py-64 mx-auto">
          {/* 작품 목록 헤더 */}
          <div className="text-center mb-20">
            <h1
              className="text-6xl font-medium title-font text-gray-900 mb-4"
              data-aos="fade-down"
            >
              스타일 트랜스퍼
            </h1>
            <p
              className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
              data-aos="fade-in"
            >
              좋아하는 작품이 있나요? 해당 작품의 스타일로 본인의 그림을
              바꿔보세요.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
            </div>
          </div>

          <div className="container px-5 py-48 mx-auto mb-16">
            <div className="flex flex-col items-center justify-center pb-32 mb-32 border-solid border-b border-gray-200">
              <h2 className="text-3xl mb-10">
                스타일 트랜스퍼를 적용할 사진을 고르세요.
              </h2>
              {targetImg && (
                <img
                  className="max-w-xl max-h-xl rounded-lg drop-shadow-md mb-10"
                  src={targetImg}
                  alt="targetImage"
                />
              )}
              {!targetImg && (
                <div
                  className={`flex justify-center items-center h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-10 ${"animate-pulse"}`}
                >
                  {/* <div className="bg-gray-200">
                    <div className="flex justify-center items-center">
                      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin text-sky-300"></div>
                    </div>
                  </div> */}
                </div>
              )}

              <div className="">
                <input
                  className="hidden"
                  type="file"
                  accept="image/jpeg"
                  ref={targetInput}
                  onChange={(e) => updateTarget(e.target.files[0])}
                />
                <button
                  className="flex mx-auto text-white bg-sky-400 border-0 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition"
                  type="button"
                  onClick={targetSelect}
                >
                  이미지 선택하기
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl mb-10">
                어떤 작품의 스타일로 바꾸고 싶으신가요?
              </h2>

              <div className="grid md:grid-cols-3 gap-2">
                {initialTestImages.map((image) => (
                  <div
                    onClick={() => {
                      updateSource(image.imgName);
                      setSelectedImgName(image.imgName);
                    }}
                    key={image.imgName}
                    className={`relative cursor-pointer rounded-lg xl:w-96 xl:h-96 w-56 h-56 bg-cover bg-center bg-gray-100 flex justify-center items-center ${
                      image.imgName === selectedImgName && "opacity-60"
                    }`}
                    style={{
                      backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${image.imgName}')`,
                    }}
                  >
                    {image.imgName === selectedImgName && (
                      <svg
                        fill="none"
                        stroke="#0284c7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="text-sky-500 w-6 h-6 flex-shrink-0 mr-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                    )}
                    {/* <img src={`${url}${imageName}`} alt="exampleImg" /> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              onClick={aiTransfer}
              className="flex mx-auto text-white bg-amber-400 border-0 py-2 px-8 items-center focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
            >
              {isLoading && (
                <CgSpinner
                  className={`animate-spin`}
                  style={{ color: "white", marginRight: "5px" }}
                />
              )}
              Style Transfer
            </button>
            {resultImg ? (
              <div className="mt-10">
                <img src={`data:image/jpeg;base64,${resultImg}`} alt="result" />
                {/* <img src={resultImg} alt="result" /> */}
                <button
                  onClick={() => downloadImg(resultImg)}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  다운로드 하기
                </button>
              </div>
            ) : (
              <div
                className={`flex justify-center items-center mt-10 h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-10 ${"animate-pulse"}`}
              ></div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default StyleTransfer;
