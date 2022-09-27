import { useRef, useState } from "react";
import styled from "styled-components";

const ImgUpload = () => {
  const [newArt, setNewArt] = useState("");

  const ImageInput = useRef();

  const handleChange = () => {
    ImageInput.current.click();
  };

  const updateImg = (file) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setNewArt(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <Title>나의 아트 등록</Title>
      <hr />
      <RegistItem>아트 이미지</RegistItem>
      <Imgwrapper>
        {newArt ? <Img src={newArt} alt="newart" /> : <DefaultBox />}
      </Imgwrapper>
      <ButtonWrapper>
        <ImgInput
          type="file"
          ref={ImageInput}
          onChange={(e) => updateImg(e.target.files[0])}
        />
        <BringButton onClick={handleChange}>아트 업로드</BringButton>
      </ButtonWrapper>
    </div>
  );
};

export default ImgUpload;

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
