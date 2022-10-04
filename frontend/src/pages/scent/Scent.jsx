import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";

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
          Headers: {
            "content-type": "multipart/form-data",
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3NlcSI6IjQiLCJ1c2VyX2VtYWlsIjoibGp5MTIxMEBzc2FmeS5jb20ifQ==.1cc714a84c5a817f9934b26e9b6146834ff232a8f980a0bc8f618c401da4c842",
            withCredentials: true,
            crossDomain: true,
            credentials: "include",
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
              <div>
                {randomImgs?.map((img) => (
                  // <div
                  //   className="object-contain rounded drop-shadow-md mr-8 cursor-pointer hover:opacity-80 transition"
                  //   style={{
                  //     backgroundImage: `url('http://j7d201.p.ssafy.io/api/my-file/read/${img.pieceImg}')`,
                  //   }}
                  // ></div>
                  <img
                    src={`http://j7d201.p.ssafy.io/api/my-file/read/${img.pieceImg}`}
                    alt="picture here"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TailScent;
