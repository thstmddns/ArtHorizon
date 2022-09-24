import axios from "axios";
// import store from "../redux/store";

// const baseURL = "http://j7d201.p.ssafy.io:8081";
const baseURL = "";

// "proxy": "http://j7d201.p.ssafy.io:8081"

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL,
  // timeout: 1000,
  headers: {
    withCredentials: true,
    accept: "application/json,",
    "Content-Type": "application/json;charset=UTF-8",
    // Authorization: localStorage.getItem("access-token"),
    // crossDomain: true,
    // credentials: "include",
  },
});

// axios.defaults.headers.common["Authorization"] = `jwt ${localStorage.getItem(
//   "access-token"
// )}`;

api.interceptors.request.use((config) => {
  if (!config.headers.jwt) {
    // const accessToken = localStorage.getItem("access-token");
    const accessToken = localStorage.getItem("access-token");
    console.log("accessToken:", accessToken);
    if (accessToken) {
      // config.headers.Authorization = accessToken;
      config.headers.jwt = accessToken.slice(4);
      config.headers.crossDomain = true;
      config.headers.credentials = "include";
    }
  }
  return config;
});

// const token = store.getState().Auth.token;

export const authApi = {
  login: (loginData) => api.post("/users/login", loginData),
  signup: (signupData) => api.post("/users/signup", signupData),
  quit: () => api.delete("/users/quit"),
  changeType: () => api.put("/users/change"),
  getBookmarks: () => api.get("/users/bookmark"),
};
