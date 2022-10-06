import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    color: #222529; // 기본 검정
  }
`;

export default GlobalStyle;
