import React, { useState } from "react";
import styled from "styled-components";

import FormTitle from "../../../components/form/FormTitle";
import BaseLabel from "../../../components/input/Label";
import BaseInput from "../../../components/input/Input";
import axios from "axios";

const ProfileImage = (props) => {
  const [imageSrc, setImageSrc] = useState("");

  const token = localStorage.getItem("access-token").slice(4);

  const encodeFileToBase64 = (fileBlob) => {
    // 이미지 서버 등록
    const url = "http://j7d201.p.ssafy.io/api/my-file/profile";
    const formData = new FormData();
    formData.append("multipartFile", fileBlob);
    const config = {
      headers: {
        jwt: token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        const getString = res.data;
        console.log(getString);
        const url2 = "http://j7d201.p.ssafy.io/api/users/profile-img";
        const data = JSON.stringify({
          userImg: getString,
        });
        const config2 = {
          headers: {
            "content-type": "application/json",
            jwt: token,
          },
        };
        axios
          .put(url2, data, config2)
          .then(() => {
            alert("정상적으로 변경되었습니다");
          })
          .catch(() => alert("문제가 발생했습니다 다시 시도해주십시오"));
      })
      .catch((err) => {
        console.error(err);
        alert("문제가 발생했습니다 다시 시도해주십시오");
      });

    // 프론트단 이미지 출력
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <form>
      <TabTitle>프로필 사진 변경</TabTitle>
      <Row>
        <ImageBox>{imageSrc && <Img src={imageSrc} alt="" />}</ImageBox>
        <Label htmlFor="profileImage">
          <Button>변경하기</Button>
        </Label>
        <Input
          type="file"
          accept=".jpg"
          id="profileImage"
          name="profileImage"
          onChange={(e) => encodeFileToBase64(e.target.files[0])}
        />
      </Row>
    </form>
  );
};

export default ProfileImage;

const TabTitle = styled(FormTitle)`
  font-size: 1.6rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;

const Row = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  border: 1px solid #888383;
  background-color: #f5f5f5;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  // overflow: hidden;
`;

const Label = styled(BaseLabel)`
  margin-bottom: 0px;
  margin-left: 20px;
`;

const Input = styled(BaseInput)`
  display: none;
`;

const Button = styled.div`
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
`;
