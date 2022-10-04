import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "react-grid-system";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";

import NavigationBar from "../../components/NavigationBar";
import Input from "../../components/input/Input";
import Button from "../../components/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/authSlice";

const PieceCommit = () => {
  const dispatch = useDispatch();
  const { mySeq: userSeq } = useSelector((state) => state.auth);

  const [newArt, setNewArt] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const [artContent, setArtContent] = useState("");
  const [pieceImg, setPieceImg] = useState("");
  const [uploadArt, setUploadArt] = useState(null);
  const [sendingArt, setSendingArt] = useState(null);
  const [priceable, setPriceable] = useState(false);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [scent, setScent] = useState("");
  const [tagRecomToggle, setTagRecomToggle] = useState(false);

  const [base64, setBase64] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const ImageInput = useRef();

  const token = localStorage.getItem("access-token").slice(4);

  const handleChange = () => {
    ImageInput.current.click();
  };

  const updateImg = (file) => {
    // console.log(file);
    // 파일 자체 보관
    setUploadArt(file);
    setTags([]);
    setTagRecomToggle(false);

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
            console.log(res.data.tag);
            setScent(res.data.tag);
            setBase64(formData);
            resolve();
          })
          .catch((err) => {
            console.error(err);
          });
      };
    });
  };

  const updateArtTitle = (title) => {
    setArtTitle(title);
  };

  const updateArtContent = (content) => {
    setArtContent(content);
  };

  const changePriceable = () => {
    const changeable = !priceable;
    console.log(changeable);
    setPriceable(changeable);
  };

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const tagItemUpdate = (text) => {
    setNewTag(text);
    console.log(newTag);
  };

  const onAddTag = () => {
    let tagArr = [...tags];
    tagArr.push(newTag);
    setNewTag("");
    setTags(tagArr);
  };

  const tagRecommend = () => {
    console.log("추천받기 시작");
    const url = "http://j7d201.p.ssafy.io:8000/medici/detection";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, base64, config)
      .then((res) => {
        const aiRecommend = res.data.tag;
        console.log(aiRecommend);
        // "a animal", "a human", "plants", "mountain", "a building", "water"
        const translate = [];
        aiRecommend.forEach((tag) => {
          switch (tag) {
            case "a human":
              translate.push("사람이 있는 그림");
              break;
            case "plants":
              translate.push("나무가 있는 그림");
              break;
            case "mountain":
              translate.push("산이 있는 그림");
              break;
            case "a building":
              translate.push("건물이 있는 그림");
              break;
            case "water":
              translate.push("물이 있는 그림");
              break;
            default:
              break;
          }
        });
        setTags((preState) => preState.concat(translate));
        setTagRecomToggle(true);
      })
      .catch((err) => console.error(err));
  };

  const deleteTag = (index) => {
    console.log(index);
    let tagArr = [...tags];
    tagArr.splice(index, 1);
    setTags(tagArr);
  };

  const submitPiece = () => {
    // 이후 먼저 사진을 보내고 pieceImg를 받고 <= 여기서 이제 토큰을 가져와야하는데 어디서 가져옴? <= 해결
    // 마지막으로 pieceTitleKr, pieceDesc, pieceImg, pieceTag, pieceScent를 JSON으로 보내기
    // console.log(token);
    if (artTitle === "") {
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
          const tagString = tags.join();
          const data = {
            pieceTitleKr: artTitle,
            pieceTitleEn: "",
            pieceDesc: artContent,
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
    <div>
      <NavigationBar />
      <ItemContainer>
        <Title>나의 아트 등록</Title>
        <hr />
        <RegistItem>아트 이미지</RegistItem>
        <Imgwrapper>
          {newArt ? <Img src={newArt} alt="newart" /> : <DefaultBox />}
        </Imgwrapper>
        <ButtonWrapper>
          <ImgInput
            type="file"
            accept="image/jpeg"
            ref={ImageInput}
            onChange={(e) => updateImg(e.target.files[0])}
          />
          <BringButton onClick={handleChange}>아트 업로드</BringButton>
        </ButtonWrapper>
        <RegistItem>제목</RegistItem>
        <TitleInput
          onChange={(e) => updateArtTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <RegistItem>아트 설명</RegistItem>
        <ArtTextInput
          onChange={(e) => updateArtContent(e.target.value)}
          placeholder="설명을 입력해주세요"
        />
        <RegistItem>판매 여부</RegistItem>
        <Allow>
          {/* 스위치 안에 허용/거부 넣으면 될듯 */}
          <AllowCheck>판매 여부를 결정해주세요</AllowCheck>
          <input onClick={changePriceable} type="checkbox" value={priceable} />
        </Allow>
        {priceable && (
          <PriceInput
            min="0"
            onChange={(e) => updatePrice(e.target.value)}
            placeholder="원하는 가격을 입력해주세요"
            step="10000"
            type="number"
          />
        )}
        <RegistItem>태그 추가</RegistItem>
        <TagWrapper>
          <TagInput
            type="text"
            value={newTag}
            onChange={(e) => tagItemUpdate(e.target.value)}
          />
          <BlueButton onClick={onAddTag} value={newTag} name={newTag}>
            태그 추가
          </BlueButton>
          <WhiteButton
            onClick={tagRecommend}
            disabled={tagRecomToggle ? true : false}
          >
            {tagRecomToggle ? "이미 추천 받았습니다" : "태그 추천받기"}
          </WhiteButton>
        </TagWrapper>
        <TagContainer>
          <Row>
            {tags?.map((tag, index) => {
              if (index % 2) {
                return (
                  <ColItem key={tag}>
                    <BlueItem sm={3}>
                      # {tag}
                      <div onClick={() => deleteTag(index)}>
                        <VscChromeClose
                          color="white"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </BlueItem>
                  </ColItem>
                );
              } else {
                return (
                  <ColItem key={tag}>
                    <WhiteItem sm={3}>
                      # {tag}
                      <div onClick={() => deleteTag(index)}>
                        <VscChromeClose
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </WhiteItem>
                  </ColItem>
                );
              }
            })}
          </Row>
        </TagContainer>
        <hr />
        <br />
        <BlueButton onClick={submitPiece}>아트 등록하기</BlueButton>
        <WhiteButton>목록으로</WhiteButton>
      </ItemContainer>
    </div>
  );
};

export default PieceCommit;

const ItemContainer = styled.div`
  margin: 2vw 2vw;
  padding: 3vw 6vw;
  background: #f9f9f7;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 1.5em;
`;

const RegistItem = styled.div`
  font-weight: bolder;
  font-size: 1em;
  margin: 3em 0 1em 0;
`;

const Imgwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2vw 0;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 60%;
  max-height: 40%;
`;

const DefaultBox = styled.div`
  width: 250px;
  height: 250px;
  background: #dedede;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ImgInput = styled.input`
  display: none;
`;

const BringButton = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  color: #ffffff;
  border-radius: 10px;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #88c4e6;
    color: #6cb6e1;
  }
  margin-left: auto;
`;

const TitleInput = styled(Input)`
  width: 60%;
  &:: placeholder {
    color: #8d959f;
  }
`;

const ArtTextInput = styled.textarea`
  width: 60%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  resize: none;
  &:: placeholder {
    color: #8d959f;
  }
`;

const Allow = styled.div`
  display: flex;
  flex-direction: row;
`;

const AllowCheck = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 2rem;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  margin-bottom: 1vw;
`;

const PriceInput = styled(Input)`
  width: 300px;
  &:: placeholder {
    color: #8d959f;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TagInput = styled(Input)`
  width: 400px;
  margin-right: 20px;
`;

const BlueButton = styled(Button)`
  width: 200px;
  height: 40px;
  font-size: 15px;
  margin-right: 20px;
`;

const WhiteButton = styled(Button)`
  width: 200px;
  color: #88c4e6;
  height: 40px;
  font-size: 15px;
  background-color: #ffffff;
`;

const TagContainer = styled.div`
  margin-top: 30px;
  margin-left: 0px;
  width: 1080px;
`;

const ColItem = styled(Col)`
  padding: 15px;
`;

const BlueItem = styled.div`
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  width: 200px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const WhiteItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;
