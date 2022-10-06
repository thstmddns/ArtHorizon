import React, { useState } from "react";

import { HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchWrapper from "../form/SearchWrapper";
import Input from "../../components/input/Input";
// import baseurl from "../../api/BaseUrl";

// react-select, react-dropdown 참고

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchType, setsearchType] = useState("");

  const navigate = useNavigate();

  const onKeyPress = (e) => {
    if (search === "") {
      alert("검색어를 입력해주세요");
    }
    if (e.key === "Enter") {
      goPiece();
    }
  };

  const searchNow = () => {
    if (search === "") {
      alert("검색어를 입력해주세요");
    }
    goPiece();
  };

  const goPiece = () => {
    const pathname = "/pieces";
    const params = { search: search, type: searchType };
    navigate({
      pathname: pathname,
      search: params,
    });
  };

  return (
    <Container>
      <SearchWrapperDif>
        <div>여기 검색 타입 넣는 자리</div>
        <ClearInput
          type="text"
          id="search"
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={onKeyPress}
          placeholder="검색어를 적어주세요"
        />
        <Startsearch onClick={searchNow}>
          <HiOutlinePencil />
        </Startsearch>
      </SearchWrapperDif>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 2vw 0;
`;

const SearchWrapperDif = styled(SearchWrapper)`
  padding: 5px 0;
  width: 600px;
`;

const ClearInput = styled(Input)`
  border: none;
  background: transparent;
  width: 400px;
`;

const Startsearch = styled.div``;
