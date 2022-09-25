import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Button from "../Button";

const Backdrop = (props) => {
  return <BackdropDiv onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <ModalCard>
      {/* <ModalOverlayTitle>모달 제목</ModalOverlayTitle> */}
      {/* <ModalOverlayContent>{props.content}</ModalOverlayContent> */}
      <ModalOverlayContent>{props.content}</ModalOverlayContent>
      <ModalOverlayButton onClick={props.onConfirm}>확인</ModalOverlayButton>
    </ModalCard>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay content={props.content} onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;

const BackdropDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalCard = styled.div`
  position: fixed;
  top: 30vh;
  // top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 35rem;
  height: 12rem;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  z-index: 100;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: #f9f9f7;
`;

// const ModalOverlayTitle = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 60px;
// `;

const ModalOverlayContent = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const ModalOverlayButton = styled(Button)`
  width: 10rem;
  height: 45px;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background-color: #6cb6e1;
    border: 1px solid #88c4e6;
  }
`;
