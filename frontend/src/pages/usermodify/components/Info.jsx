import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { changeProfile, getUser } from "../../../redux/authSlice";

import Modal from "../../../components/modal/Modal";

const Info = (props) => {
  const dispatch = useDispatch();
  const originNickname = useSelector((state) => state.auth.nickname);
  const originDesc = useSelector((state) => state.auth.desc);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [errorNicknameMessage, setErrorNicknameMessage] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    setNickname(originNickname);
    setDescription(originDesc);
  }, [dispatch, originNickname, originDesc]);

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorNicknameMessage("");

    if (!nickname.trim()) {
      setErrorNicknameMessage("닉네임을 입력하세요");
      return;
    }

    const profileData = JSON.stringify({
      userNickname: nickname,
      userDesc: description,
    });

    setNickname("");
    setDescription("");
    setErrorNicknameMessage("");
    // dispatch(getUser());
    // dispatch(changeProfile(profileData));

    dispatch(changeProfile(profileData));
    setModal(true);
  };

  return (
    <React.Fragment>
      {modal && (
        <Modal content={"일단 전송 완료"} onConfirm={() => setModal(false)} />
      )}
      <form method="post" onSubmit={submitHandler}>
        <TabTitle>기본정보 변경</TabTitle>
        <FormControl>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="변경할 닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <ErrorMessage>{errorNicknameMessage}</ErrorMessage>
        </FormControl>
        <FormControl>
          <Label htmlFor="statusMessage">상태 메시지</Label>
          <Textarea
            id="statusMessage"
            name="statusMessage"
            placeholder="상태 메시지를 입력하세요"
            rows="7"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </FormControl>
        <Button type="submit">변경하기</Button>
      </form>
    </React.Fragment>
  );
};

export default Info;

const FormControl = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Input = styled.input`
  height: 2rem;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 3px 12px 3px 12px;
  background-color: #ffffff;
  &::placeholder {
    color: #d9d9d9;
  }
`;

const Textarea = styled.textarea`
  height: 2rem;
  border-radius: 10px;
  border: 1px solid #d1d7de;
  padding: 12px;
  background-color: #ffffff;
  &::placeholder {
    color: #d9d9d9;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  height: 20px;
  display: inline-flex;
  align-items: center;
  margin-left: 12px;
  color: #db5858;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #88c4e6;
  border: 1px solid #6cb6e1;
  border-radius: 10px;
  color: #ffffff;
  width: 15rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
`;

const TabTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 60px;
  padding-bottom: 5px;
  border-bottom: 1px solid #222529;
`;
