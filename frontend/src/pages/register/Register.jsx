import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { CgSpinner } from "react-icons/cg";

import NavBar from "../../components/NavBar";

import { getUser } from "../../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { mySeq: userSeq } = useSelector((state) => state.auth);

  const [newArt, setNewArt] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priceable, setPriceable] = useState(false);
  const [price, setPrice] = useState(0);

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [scent, setScent] = useState("");

  const [inputTag, setInputTag] = useState("");

  const [isLoadingRecommend, setIsLoadingRecommend] = useState(false);
  const [recommendComplete, setRecommendComplete] = useState(false);

  const [pieceImg, setPieceImg] = useState("");
  const [uploadArt, setUploadArt] = useState(null);
  const [sendingArt, setSendingArt] = useState(null);
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, tags]);

  const ImageInput = useRef();
  const token = localStorage.getItem("access-token").slice(4);

  // 이미지 업로드하면서 향 태그 가져옴
  const uploadImage = (file) => {
    // 파일 자체 보관
    setUploadArt(file);
    setTags([]);
    setRecommendComplete(false);

    // base64형식 파일 만들기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        const encode = reader.result;
        // 읽기 처리된 파일 => 이미지 보기 용
        setNewArt(encode);
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
        setSendingArt(file);
        const url = "http://j7d201.p.ssafy.io:8000/medici/tags";
        const config = {
          Headers: {
            "content-type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        formData.append("img", file);
        axios
          .post(url, formData, config)
          .then((res) => {
            setScent(res.data.tag);
            setBase64(formData);
            resolve();
          })
          .catch((err) => console.error(err));
      };
    });
  };

  const addTagsHandler = (e) => {
    e.preventDefault();

    setTags((prev) => [
      ...prev,
      { id: Math.random().toString(), tagName: inputTag, isSelected: true },
    ]);

    setInputTag("");
  };

  const toggleTagsHandler = (selectedTagId) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        return {
          id: tag.id,
          tagName: tag.tagName,
          isSelected:
            selectedTagId === tag.id ? !tag.isSelected : tag.isSelected,
        };
      });
    });
  };

  const tagRecommend = () => {
    setIsLoadingRecommend(true);
    const url = "http://j7d201.p.ssafy.io:8000/medici/detection";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, base64, config)
      .then((res) => {
        const fetchedTagNames = res.data.tag;
        const recommendedTagNames = [];
        fetchedTagNames.forEach((tag) => {
          let tagName = "";
          switch (tag) {
            case "a human":
              tagName = "사람이 있는";
              break;
            case "plants":
              tagName = "나무가 있는";
              break;
            case "mountain":
              tagName = "산이 있는";
              break;
            case "a building":
              tagName = "건물이 있는";
              break;
            case "water":
              tagName = "물이 있는";
              break;
            default:
              break;
          }
          recommendedTagNames.push(tagName);
        });
        setTags((prev) => [
          ...prev,
          ...recommendedTagNames.map((rTagName) => {
            return {
              id: Math.random().toString(),
              tagName: rTagName,
              isSelected: true,
            };
          }),
        ]);
        setRecommendComplete(true);
        setIsLoadingRecommend(false);
      })
      .catch((err) => console.error(err));
  };

  const submitPiece = () => {
    // 이후 먼저 사진을 보내고 pieceImg를 받고 <= 여기서 이제 토큰을 가져와야하는데 어디서 가져옴? <= 해결
    // 마지막으로 pieceTitleKr, pieceDesc, pieceImg, pieceTag, pieceScent를 JSON으로 보내기
    // console.log(token);
    if (title === "") {
      alert("제목을 적어주세요");
      return;
    } else if (tags.length === 0) {
      alert("태그는 적어도 하나 이상 있어야합니다");
      return;
    }
    try {
      const formData2 = new FormData();
      formData2.append("multipartFile", uploadArt);
      const url1 = "http://j7d201.p.ssafy.io/api/my-file/user-art";
      const url2 = "http://j7d201.p.ssafy.io/api/user-art";
      const config1 = {
        headers: {
          jwt: token,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(url1, formData2, config1)
        .then((res) => {
          console.log(res);
          setPieceImg(res.data);
          console.log("tags:", tags);
          const tagString = tags.map((tag) => tag.tagName).join();
          console.log(tagString);
          const data = {
            pieceTitleKr: title,
            pieceTitleEn: "",
            pieceDesc: content,
            pieceImg: res.data,
            pieceTag: tagString,
            pieceScent: scent,
            piecePrice: price,
          };
          const config2 = {
            headers: {
              "Content-Type": "application/json",
              jwt: token,
            },
          };
          axios
            .post(url2, JSON.stringify(data), config2)
            .then((res) => {
              console.log(res);
              // navigate(`/mypage/${userSeq}`);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } catch {
      console.error("오류가 발생했습니다");
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <section
        className="border-solid border-gray-50 border-b-2"
        style={{ marginTop: "71px", minHeight: "87.5vh" }}
      >
        <div className="container flex flex-col py-24 mx-auto">
          <div
            className="text-2xl text-gray-700 font-bold border-solid border-b border-gray-300 mb-8"
            data-aos="fade-left"
          >
            나의 아트 등록
          </div>

          {/* 아트 사진 박스 */}
          <div className="">
            {newArt && (
              <img
                className="max-w-xl max-h-xl rounded-lg drop-shadow-md mb-10"
                src={newArt}
                alt="newArt"
              />
            )}
            {!newArt && (
              <div
                className={`flex justify-center items-center h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-10 ${"animate-pulse"}`}
              >
                defaultbox
              </div>
            )}
          </div>

          {/* 아트 업로드 버튼 */}
          <div className="mb-4">
            <input
              className="hidden"
              type="file"
              accept="image/jpeg"
              ref={ImageInput}
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            <button
              className="flex text-white bg-amber-300 border-0 py-3 px-6 hover:bg-amber-400 active:bg-amber-500 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
              type="button"
              onClick={() => ImageInput.current.click()}
            >
              아트 업로드
            </button>
          </div>

          {/* 아트 제목 */}
          <div className="relative mb-4">
            <label htmlFor="title" className="leading-7 text-gray-900">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
              placeholder="제목을 입력해주세요"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 아트 설명 */}
          <div className="relative mb-4">
            <label htmlFor="content" className="leading-7 text-gray-900">
              아트 설명
            </label>
            <input
              type="text"
              id="content"
              name="content"
              className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
              placeholder="설명을 입력해주세요"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 판매 여부, 가격 */}
          <div className="mb-4">
            <label
              htmlFor="Toggle1"
              className="inline-flex items-center space-x-4 cursor-pointer mb-4"
            >
              <span>판매 여부</span>
              <span className="relative">
                {priceable && (
                  <input
                    id="Toggle1"
                    type="checkbox"
                    className="hidden peer"
                    checked
                    onChange={() => setPriceable(false)}
                  />
                )}
                {!priceable && (
                  <input
                    id="Toggle1"
                    type="checkbox"
                    className="hidden peer"
                    onChange={() => setPriceable(true)}
                  />
                )}
                <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 peer-checked:bg-sky-400 transition"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white transition"></div>
              </span>
              <span></span>
            </label>

            {priceable && (
              <fieldset
                className="w-full space-y-1 dark:text-gray-100"
                data-aos="fade-left"
              >
                <label htmlFor="price" className="block text-sm font-medium">
                  원하는 가격을 입력해주세요
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    name="price"
                    id="price"
                    placeholder="0"
                    className="flex flex-1 text-right border sm:text-sm rounded-l-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400"
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                  />
                  <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-r-md dark:bg-gray-700">
                    &#8361;
                  </span>
                </div>
              </fieldset>
            )}
          </div>

          {/* 태그 추가 */}
          <form method="post" onSubmit={addTagsHandler}>
            <div className="mb-4">
              <label htmlFor="tag" className="leading-7 text-gray-900">
                태그 추가
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
                placeholder="태그를 입력하세요"
                // value={newTag}
                value={inputTag}
                onChange={(e) => {
                  setInputTag(e.target.value);
                }}
              />

              <div className="flex">
                <button
                  className="flex text-white bg-amber-300 border-0 py-3 px-6 hover:bg-amber-400 active:bg-amber-500 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                  type="button"
                  onClick={addTagsHandler}
                >
                  태그 추가하기
                </button>

                <button
                  className="flex text-amber-500 bg-white border border-amber-300 py-3 px-6 hover:bg-amber-300 hover:text-white active:bg-amber-400 focus:ring focus:ring-amber-300 rounded-lg transition mr-2"
                  type="button"
                  onClick={tagRecommend}
                  disabled={
                    isLoadingRecommend || recommendComplete ? true : false
                  }
                >
                  {isLoadingRecommend && (
                    <CgSpinner
                      className={`animate-spin`}
                      style={{ color: "white", marginRight: "5px" }}
                    />
                  )}
                  {isLoadingRecommend && "추천받는 중.."}
                  {!isLoadingRecommend &&
                    !recommendComplete &&
                    "AI에게 태그 추천받기"}
                  {!isLoadingRecommend && recommendComplete && "추천 완료"}
                </button>
              </div>
            </div>
          </form>

          <div className="flex pb-8 border-solid border-b border-gray-100 mb-8">
            {tags?.map((tag) => (
              <div
                className={`flex px-4 py-3 mr-4 rounded-lg drop-shadow-md border-solid border border-gray-200 bg-white cursor-pointer hover:bg-sky-300 hover:text-white transition ${
                  tag.isSelected &&
                  " text-white bg-sky-300 hover:bg-white hover:text-sky-500"
                }`}
                key={tag.id}
                onClick={() => toggleTagsHandler(tag.id)}
                // data-aos="zoom-in"
              >
                # {tag.tagName}
              </div>
            ))}
          </div>

          <button
            className="flex mx-auto text-white bg-sky-400 border border-sky-300 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition"
            type="button"
            onClick={submitPiece}
          >
            아트 등록하기
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;

// {tags?.map((tag, index) => {
//   if (index % 2) {
//     return (
//       <ColItem key={tag}>
//         <BlueItem sm={3}>
//           # {tag}
//           <div onClick={() => deleteTag(index)}>
//             <VscChromeClose
//               color="white"
//               style={{
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         </BlueItem>
//       </ColItem>
//     );
//   } else {
//     return (
//       <ColItem key={tag}>
//         <WhiteItem sm={3}>
//           # {tag}
//           <div onClick={() => deleteTag(index)}>
//             <VscChromeClose
//               style={{
//                 cursor: "pointer",
//               }}
//             />
//           </div>
//         </WhiteItem>
//       </ColItem>
//     );
//   }
// })}
