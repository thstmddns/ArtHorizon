import { useState } from "react";
import styled from "styled-components";
import Input from "../../../components/input/Input";


const Price = () => {
  const [price, setPrice] = useState(0);

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  return (
    <div>
      <Allow>
        {/* 스위치 안에 허용/거부 넣으면 될듯 */}
        <AllowCheck>판매 여부를 결정해주세요</AllowCheck>
        <input type="checkbox" />
      </Allow>
      <PriceInput
        placeholder="원하는 가격을 입력해주세요"
        type="number"
        min="0"
        step="10000"
        onChange={(e) => updatePrice(e.target.value)}
      />
    </div>
  );
};

export default Price;

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
