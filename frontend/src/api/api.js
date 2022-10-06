import axios from "axios";
// import store from "../redux/store";

// const baseURL = "http://j7d201.p.ssafy.io:8081/api";
const baseURL = "http://j7d201.p.ssafy.io/api";
// const baseURL = "";

// "proxy": "http://j7d201.p.ssafy.io:8081/api"

// axios.defaults.withCredentials = true;

const headers = {
  // withCredentials: true,
  // accept: "application/json,",
  "Content-Type": "application/json;charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  crossDomain: true,
  credentials: "include",
  // Authorization: localStorage.getItem("access-token"),
};

const api = axios.create({
  baseURL,
  headers: headers,
});

// axios.defaults.headers.common["Authorization"] = `jwt ${localStorage.getItem(
//   "access-token"
// )}`;
// const token = store.getState().Auth.token;

api.interceptors.request.use((config) => {
  if (!config.headers.jwt) {
    const accessToken = localStorage.getItem("access-token");
    // console.log("accessToken:", accessToken);
    if (accessToken) {
      // config.headers.Authorization = accessToken;
      config.headers.jwt = accessToken.slice(4);
      config.headers.crossDomain = true;
      config.headers.credentials = "include";
      config.headers.withCredentials = true;
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
  checkEmail: (email) => api.get("/users/check", { params: { email } }),
  checkNickname: (nickname) =>
    api.get("/users/check", { params: { nickname } }),
  quit: () => api.delete("/users/quit"),
  changeProfile: (profileData) => api.put("/users/change-profile", profileData),
  changePassword: (passwordData) => api.put("/users/password", passwordData),
  changeType: () => api.put("/users/change"),
  getBookmarkArts: () => api.get("/users/bookmark"),
  getMyPage: (targetUserSeq) =>
    api.get(`/users/profile/${targetUserSeq}`, {
      headers: {
        jwt: "",
        crossDomain: true,
        credentials: "include",
        withCredentials: true,
      },
    }),
  follow: (targetUserSeq) => api.post(`/users/follow/${targetUserSeq}`),
  unfollow: (targetUserSeq) => api.delete(`/users/follow/${targetUserSeq}`),
  getFollowers: (targetUserSeq) =>
    api.get(`/users/followers/${targetUserSeq}?page=${1}`),
  setBookmark: (pieceSeq) => api.post(`/users/bookmark/${pieceSeq}`),
  deleteBookmark: (pieceSeq) => api.delete(`/users/bookmark/${pieceSeq}`),
};

export const piecesApi = {
  getPiecesRecent: (page) => api.get("/pieces/recent", { params: { page } }),
  getPiecesPopular: (page) => api.get("/pieces/popular", { params: { page } }),
  getPiecesRandom: (page) => api.get("/pieces/random", { params: { page } }),
  getPieceDetail: (pieceSeq) =>
    api.get(`/pieces/${pieceSeq}`, {
      headers: {
        jwt: "",
        crossDomain: true,
        credentials: "include",
        withCredentials: true,
      },
    }),
  getMainTags: () => api.get("pieces/tag"),
  getBackgroundImage: () => api.get("/pieces/main"),
};

export const artistApi = {
  getRandomArtists: () => api.get("/users/artist"),
};

export const userArtApi = {
  // getUserArts: (page) => api.get("/user-art", { params: { page } }),
  getUserArts: (targetUserSeq) => api.get(`/user-art/${targetUserSeq}`),
};

export const searchApi = {
  searchPiece: (searchData, page) =>
    api.post(`/search/pieces`, searchData, { params: { page } }),
  searchArtist: (searchData, page) =>
    api.post(`/search/artists`, searchData, { params: { page } }),
  searchUser: (searchData, page) =>
    api.post(`/search/users`, searchData, { params: { page } }),
  searchTag: (searchData, page) =>
    api.post(`/search/tags`, searchData, { params: { page } }),
};
