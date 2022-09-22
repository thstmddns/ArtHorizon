import styled from "styled-components";

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

export default Textarea;
