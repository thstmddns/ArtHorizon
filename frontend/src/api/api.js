import axios from "axios";
import store from "../redux/store";

const baseURL = "http://j7d201.p.ssafy.io:8081";

// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL,
  // timeout: 1000,
  headers: {
    withCredentials: true,
    // accept: "application/json,",
    // "Content-Type": "application/json;charset=UTF-8",
  },
});

// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

api.interceptors.request.use(
  (config) => {
    const token = store.getState().Auth.token;
    try {
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `jwt ${token}`;
      }
      return config;
    } catch (error) {
      console.error("[_axios.interceptors.request] config: " + error);
    }
  },
  (error) => Promise.reject(error)
);

// api.interceptors.request.use((config) => {
//   if (!config.headers.authorization) {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.authorization = token;
//     }
//   }
//   return config;
// });

const token = store.getState().Auth.token;

export const authApi = {
  login: (loginData) => api.post("/login", loginData),
};
