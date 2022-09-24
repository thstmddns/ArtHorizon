import axios from "axios";
import { redirect } from "react-router-dom";
import baseurl from "./BaseUrl";

const Login = (id, password) => {
  const url = `${baseurl}/users/login`;
  const data = JSON.stringify({
    userEmail: id,
    userPassword: password,
  });
  axios
    .post(url, data)
    .then((res) => {
      console.log(res);
      redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Login;
