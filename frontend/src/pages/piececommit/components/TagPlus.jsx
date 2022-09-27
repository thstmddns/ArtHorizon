import { useState } from "react";
import styled from "styled-components";

import { Row, Col } from "react-grid-system";
import { VscChromeClose } from "react-icons/vsc";
import Input from "../../../components/input/Input";
import Button from "../../../components/Button";

const TagPlus = () => {
  const [tags, setTags] = useState([
    "밝음",
    "빛나는",
    "사과",
    "바다",
    "스파이시",
  ]);
  const [newTag, setNewTag] = useState([]);

  const tagItemUpdate = (text) => {
    setNewTag(text);
    
  };

  const deleteTag = () => {};

  return (
    <div>
      <RegistItem>태그 추가</RegistItem>
      <TagWrapper>
        <TagInput
          name="newTag"
          onChange={(e) => tagItemUpdate(e.target.value)}
        />
        <BlueButton>태그 추가</BlueButton>
        <WhiteButton>태그 추천받기</WhiteButton>
      </TagWrapper>
      <TagContainer>
        <Row>
          {tags?.map((tag, index) => {
            if (index % 2) {
              return (
                <ColItem key={index}>
                  <BlueItem sm={3}>
                    # {tag}
                    <VscChromeClose color="white" onClick={deleteTag} />
                  </BlueItem>
                </ColItem>
              );
            } else {
              return (
                <ColItem key={index}>
                  <WhiteItem sm={3}>
                    # {tag} <VscChromeClose key={index} onClick={deleteTag()} />
                  </WhiteItem>
                </ColItem>
              );
            }
          })}
        </Row>
      </TagContainer>
    </div>
  );
};

export default TagPlus;

const RegistItem = styled.div`
  font-weight: bolder;
  font-size: 1em;
  margin: 3em 0 1em 0;
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
