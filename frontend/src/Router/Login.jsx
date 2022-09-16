import React from "react";
import styled from "styled-components";

const LoginDiv = styled.div`
  background-image: 'url(../../public/images/backgroundImage.jpg)';
  `

const Login = () => {
    return (
      <div>
        <LoginDiv>
          Here is Login, Right?
        </LoginDiv>
      </div>
    )
}

export default Login