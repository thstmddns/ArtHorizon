import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import NavBar from "../../components/NavBar";

const TailScent = () => {
  const [image, setImage] = useState("");
  const [scent, setScent] = useState("당신의 향은?");
  const [randomImgs, setRandomImgs] = useState([]);
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
        const encode = reader.result;
        setImage(encode);
        const byteString = atob(encode.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
          type: "image/jpeg",
        });
        const file = new File([blob], "image.jpg");
        // const url = "http://127.0.0.1:8000/medici/tags";
        const url = "http://j7d201.p.ssafy.io:8000/medici/tags";

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const formData = new FormData();
        formData.append("img", file);
        axios
          .post(url, formData, config)
          .then((res) => {
            const getScent = res.data.tag;
            // console.log(getScent);
            setScent(getScent);
            // 여기서 이 향을 가진 다른 그림을 호출하는 axios가 있어야할듯?
            const nextUrl = `http://j7d201.p.ssafy.io/api/pieces/scent/${getScent}`;
            axios
              .get(nextUrl)
              .then((res) => {
                const result = res.data;
                console.log(result);
                // setRandomImgs((prev) => prev.concat(result));
                setRandomImgs(result);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => {
            console.error(err);
          });
        resolve();
      };
    });
  };

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
              그림의 향
            </h1>
            <p
              className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500"
              data-aos="fade-in"
            >
              당신이 올린 이미지는 어떤 향을 가지고 있을까요? <br />
              확인하고 같은 향을 가진 작품들도 함께 보세요.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-sky-500 inline-flex"></div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center pb-32 mb-3">
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
            <div className="flex flex-col items-center justify-center mx-auto">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                {scent}
              </h1>
              {/* 여기 이제 향 별 대표 이미지 들어갈 예정 */}
              <h2>같은 향을 가진 그림</h2>
              {/* 비슷한 이미지 호출(api가 있나...?) */}
              <div className="flex flex-row mb-10">
                {randomImgs?.map((img) => (
                  <img
                    className="mx-auto"
                    src={`http://j7d201.p.ssafy.io/api/my-file/read/${img.pieceImg}`}
                    alt="pic here"
                    key={img.pieceImg}
                    style={{
                      maxWidth: "400px",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}
          {/* 여기서부터 다시 */}

          <div className="container px-5 py-48 mx-auto mb-16">
            <div className="flex flex-col items-center justify-center pb-32 mb-32 border-solid border-b border-gray-200">
              <h2 className="text-3xl mb-10">
                스타일 트랜스퍼를 적용할 사진을 고르세요.
              </h2>
              {/* {targetImg && ( */}
              {true && (
                <img
                  className="max-w-xl max-h-xl rounded-lg drop-shadow-md mb-10"
                  // src={targetImg}
                  alt="targetImage"
                />
              )}
              {/* {!targetImg && ( */}
              {true && (
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
                  // ref={targetInput}
                  // onChange={(e) => updateTarget(e.target.files[0])}
                />
                <button
                  className="flex mx-auto text-white bg-sky-400 border-0 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition"
                  type="button"
                  // onClick={targetSelect}
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
                {/* {initialTestImages.map((image) => (
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
                  </div>
                ))} */}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-center">
            <button
              className="flex mx-auto text-white bg-amber-400 border-0 py-2 px-8 items-center focus:outline-none hover:bg-amber-500 active:bg-amber-600 focus:ring focus:ring-amber-300 rounded-lg text-lg transition"
              onClick={aiTransfer}
            >
              {isLoading && (
                <CgSpinner
                  className={`animate-spin`}
                  style={{ color: "white", marginRight: "5px" }}
                />
              )}
              Style Transfer
            </button>
            {isLoading && (
              <div
                className={`flex justify-center items-center mt-10 h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-10 ${"animate-pulse"} transition`}
              ></div>
            )}
            {resultImg ? (
              <div className="flex flex-col justify-center items-center mt-10">
                <img
                  src={`data:image/jpeg;base64,${resultImg}`}
                  alt="result"
                  className="rounded-lg mb-2"
                />
                <button
                  onClick={() => downloadImg(resultImg)}
                  className="flex mx-auto text-white bg-sky-400 border-0 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition"
                  type="button"
                >
                  다운로드 하기
                </button>
              </div>
            ) : (
              <div
              // className={`flex justify-center items-center mt-10 h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-10 ${"animate-pulse"}`}
              ></div>
            )}
          </div> */}
        </div>
      </section>
    </React.Fragment>
  );
};

export default TailScent;
