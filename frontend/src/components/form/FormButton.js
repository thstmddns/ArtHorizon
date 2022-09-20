import styled from "styled-components";

import Button from "../Button";

const FormButton = styled(Button)`
  width: 100%;
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

export default FormButton;
