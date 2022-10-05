import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

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
              당신의 이미지는 어떤 향을 가지고 있을까요? 같은 향을 가진 작품들도
              함께 확인하세요
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-amber-500 inline-flex"></div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-48 mb-32 border-solid border-b border-gray-200">
            <div className="flex flex-col justify-center items-center mb-10">
              {image && (
                <img
                  className="max-w-xl max-h-xl rounded-lg"
                  src={image}
                  alt="선택한 이미지"
                />
              )}
              {!image && (
                <h2 className="text-3xl mb-10">
                  향을 찾고싶은 이미지를 고르세요
                </h2>
              )}
              {!image && (
                <div
                  className={`h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md0 ${"animate-pulse"}`}
                ></div>
              )}
            </div>

            <div className="">
              <input
                className="hidden"
                type="file"
                accept="image/jpeg"
                ref={ImageInput}
                onChange={(e) => updateImg(e.target.files[0])}
              />
              <button
                className="flex text-white bg-amber-300 border-0 py-3 px-6 hover:bg-amber-400 active:bg-amber-500 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                type="button"
                onClick={handleChange}
              >
                이미지 선택하기
              </button>
            </div>
          </div>

          {scent !== "당신의 향은" && (
            <div className="flex flex-col items-center justify-center mx-auto">
              <div className="flex flex-col justify-center items-center mb-10">
                <h1 className="text-3xl mb-10">{scent}</h1>
                <h2 className="text-md text-gray-500">같은 향을 가진 그림</h2>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-gray-500 inline-flex"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-2">
                {randomImgs?.map((image) => (
                  <div
                    key={image.pieceImg}
                    className="relative cursor-pointer rounded-lg xl:w-96 xl:h-96 w-56 h-56 bg-cover bg-center bg-gray-100 flex justify-center items-center"
                    style={{
                      backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${image.pieceImg}')`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default TailScent;
