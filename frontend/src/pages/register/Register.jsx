import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { CgSpinner } from "react-icons/cg";

import NavBar from "../../components/NavBar";

const Register = () => {
  const myUserType = useSelector((state) => state.auth.myUserType);
  const mySeq = useSelector((state) => state.auth.mySeq);
  const navigate = useNavigate();

  const [newArt, setNewArt] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priceable, setPriceable] = useState(false);
  const [price, setPrice] = useState(0);

  const [tags, setTags] = useState([]);
  const [scent, setScent] = useState("");

  const [inputTag, setInputTag] = useState("");

  const [isLoadingRecommend, setIsLoadingRecommend] = useState(false);
  const [recommendComplete, setRecommendComplete] = useState(false);

  const [pieceImg, setPieceImg] = useState("");
  const [uploadArt, setUploadArt] = useState(null);
  const [sendingArt, setSendingArt] = useState(null);
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    // if (myUserType !== "A") {
    //   navigate("/", { replace: true });
    //   toast.warn("작가만 작품을 등록할 수 있습니다");
    // }
  }, []);

  useEffect(() => {}, [tags]);

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
            toast.success("이미지가 업로드되었습니다");
          })
          .catch(() => toast.error("이미지 업로드 실패"));
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
    if (!uploadArt) {
      toast.warn("먼저 이미지를 업로드하세요");
      return;
    }

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
    if (!uploadArt) {
      toast.warn("이미지를 업로드하세요");
      return;
    }
    if (title === "") {
      toast.warn("제목을 입력하세요");
      return;
    } else if (tags.length === 0) {
      toast.warn("적어도 한개의 태그가 필요합니다");
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
          setPieceImg(res.data);
          const tagString = tags.map((tag) => tag.tagName).join();
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
            .then(() => {
              toast.success("성공적으로 작품을 등록했습니다");
              navigate(`/mypage/${mySeq}`, { replace: true });
            })
            .catch(() => toast.error("작품 등록 실패"));
        })
        .catch(() => toast.error("작품 등록 실패"));
    } catch {
      toast.error("작품 등록 실패");
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

          <div className="" data-aos="fade-in">
            {/* 아트 사진 박스 */}
            <div className="">
              {newArt && (
                <img
                  className="max-w-xl max-h-xl rounded-lg drop-shadow-md mb-4"
                  src={newArt}
                  alt="newArt"
                />
              )}
              {!newArt && (
                <div
                  className={`flex justify-center items-center h-96 w-96 p-4 bg-gray-200 rounded-lg drop-shadow-md mb-4 ${"animate-pulse"}`}
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
              <textarea
                id="content"
                name="content"
                className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-6 h-32 transition"
                placeholder="설명을 입력해주세요 (선택)"
                defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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
                      className="w-full bg-gray-50 rounded-l-lg border border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200 outline-none text-gray-700 py-1 px-3 leading-8 transition"
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                    <span className="flex items-center py-1 px-3 pointer-events-none border border-gray-300 sm:text-sm rounded-r-lg bg-gray-200">
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

                <div className="flex mb-2">
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

                <div className="text-gray-500 text-sm">태그를 선택하세요</div>
              </div>
            </form>

            {/* 태그들 */}
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

            {/* 아트 등록 버튼 */}
            <button
              className="flex mx-auto text-white bg-sky-400 border border-sky-300 py-2 px-8 focus:outline-none hover:bg-sky-500 active:bg-sky-600 focus:ring focus:ring-sky-300 rounded-lg text-lg transition"
              type="button"
              onClick={submitPiece}
            >
              아트 등록하기
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
