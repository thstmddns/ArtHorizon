import axios from "axios";
import React from "react";
import { useRef, useState } from "react";

const StyleTransfer = () => {
  const [targetImg, setTargetImg] = useState("");
  const [sourceImg, setSourceImg] = useState("");
  const [resultImg, setResultImg] = useState("");
  const targetInput = useRef();

  // const pictures = [picture1, picture2, picture3, picture4, picture5];

  const targetSelect = () => {
    targetInput.current.click();
  };

  const updateTarget = async (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setTargetImg(reader.result);
        resolve();
      };
    });
  };

  const clickPicture = async (index) => {
    switch (
      index
      // case 0:
      //   setSourceImg(picture1);
      //   break;
      // case 1:
      //   setSourceImg(picture2);
      //   break;
      // case 2:
      //   setSourceImg(picture3);
      //   break;
      // case 3:
      //   setSourceImg(picture4);
      //   break;
      // case 4:
      //   setSourceImg(picture5);
      //   break;
    ) {
    }
  };

  const sendPictures = () => {
    const file = new FormData();
    file.append("file", targetImg);

    // axios
    //   .post(`${baseurl}/medici/nst`, pictures)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>Style Transfer할 사진을 골라주세요</div>
              <img />
            </div>
            <div></div>
            <div>
              <div>어떤 작품의 스타일로 바꾸고 싶으신가요?</div>
              <div>
                {targetImg && <img src={targetImg} alt="targetImage" />}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/jpg"
                  ref={targetInput}
                  onChange={(e) => updateTarget(e.target.files[0])}
                />
                <button onClick={targetSelect}>이미지 선택하기</button>
              </div>
            </div>
          </div>
          <div></div>
          <div>
            <div>어떤 스타일로 바꾸고 싶으신가요?</div>
            {/* {pictures.map((picture, index) => {
              return (
                <div
                  key={`picture${index}`}
                  onClick={() => clickPicture(index)}
                >
                  <img src={picture} alt="sourcePicture" />
                </div>
              );
            })} */}
          </div>
        </div>
        <div>
          <button onClick={sendPictures}>Style Transfer</button>
        </div>
        <div>{resultImg && <img src={resultImg} alt="resultImg" />}</div>
      </div>
    </div>
  );
};

export default StyleTransfer;
