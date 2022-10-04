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
      <section className="text-gray-600 body-font">
        <div className="text-center mb-20" style={{ marginTop: "71px" }}>
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
      </section>
    </React.Fragment>
  );
};

export default TailScent;
