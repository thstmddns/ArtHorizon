import React, { useState } from "react";

import { HiOutlineMagnifyingGlass } from "react-icon/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SerachWrapper } from "../../components/form";
import { Input } from "../../components/input";
import baseurl from "../../api/BaseUrl";

const SearchBar = () => {
  const [serach, setSearch] = useState();
  const [serachType, setSerachType] = useState("");

  const navigate = useNavigate();

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      goPiece();
    }
  };

  const serachNow = () => {
    goPiece();
  };

  const goPiece = () => {
    navigate(`/pieces`, {});
  };

  return (
    <SerachWrapper>
      <Input
        type="text"
        id="serach"
        name="serach"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={onKeyPress}
        placeholder="검색어를 적어주세요"
      ></Input>
      <StartSerach onClick={serachNow}>
        <HiOutlineMagnifyingGlass />
      </StartSerach>
    </SerachWrapper>
  );
};

export default SearchBar;

const StartSerach = styled.div``;
