import axios from "axios";
// import store from "../redux/store";

// const baseURL = "http://j7d201.p.ssafy.io:8081/api";
const baseURL = "";

// "proxy": "http://j7d201.p.ssafy.io:8081/api"

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
// const token = store.getState().Auth.token;

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
    } else {
      // config.headers.jwt = "";
    }
  }
  return config;
});

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const authApi = {
  getUser: () => api.get("/users/info"),
  login: (loginData) => api.post("/users/login", loginData),
  signup: (signupData) => api.post("/users/signup", signupData),
  quit: () => api.delete("/users/quit"),
  changeProfile: (profileData) => api.put("/users/change-profile", profileData),
  changePassword: (passwordData) => api.put("/users/password", passwordData),
  changeType: () => api.put("/users/change"),
  getBookmarks: () => api.get("/users/bookmark"),
  // getMyPage: (targetSeq) => api.get(`/users/profile/${targetSeq}`),
  getMyPage: (targetUserSeq) => api.get(`/users/profile/${targetUserSeq}`),
  follow: (targetUserSeq) => api.post(`/users/follow/${targetUserSeq}`),
  unfollow: (targetUserSeq) => api.delete(`/users/follow/${targetUserSeq}`),
};
