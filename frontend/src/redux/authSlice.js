import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authApi } from "../api/api";

const initialState = {
  isLoggedIn: false,
  mySeq: "",
  myEmail: "",
  myNickname: "",
  myImageURL: "",
  myUserType: "",
  myDesc: "",
};

export const getUser = createAsyncThunk(
  "authSlice/getUser",
  async (_, { rejectWithValue, getState }) => {
    // const isLoggedIn = getState().auth.isLoggedIn;
    // if (!isLoggedIn) {
    //   return rejectWithValue();
    // }
    try {
      const res = await authApi.getUser();
      return res.data;
    } catch (err) {
      return rejectWithValue(JSON.parse(err));
    }
  }
);

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
      // axios.defaults.headers.common["Authorization"] = `jwt ${res.data}`;
    } catch (err) {
      return rejectWithValue(JSON.parse(err));
    }
  }
);

export const signup = createAsyncThunk(
  "authSlice/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(credentials);
      localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
    } catch (err) {
      return rejectWithValue(JSON.parse(err));
    }
  }
);

export const quit = createAsyncThunk(
  "authSlice/quit",
  async (_, { rejectWithValue }) => {
    try {
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `jwt ${localStorage.getItem("access-token")}`;
      const res = await authApi.quit();
      console.log(res);
      localStorage.removeItem("access-token");
    } catch (err) {
      console.error(err);
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changeProfile = createAsyncThunk(
  "authSlice/changeProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await authApi.changeProfile(profileData);
      console.log(res);
    } catch (err) {
      console.error(err);
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changePassword = createAsyncThunk(
  "authSlice/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const res = await authApi.changePassword(passwordData);
      console.log(res);
    } catch (err) {
      console.error(err);
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

export const changeType = createAsyncThunk(
  "authSlice/changeType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.changeType();
      console.log(res);
    } catch (err) {
      console.error(err);
      return rejectWithValue(JSON.parse(err.response));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfoSelector: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.mySeq = 0;
      state.myEmail = "";
      state.myNickname = "";
      state.myImageURL = "";
      state.myUserType = "";
      state.myDesc = "";
      localStorage.removeItem("access-token");
      toast.success("성공적으로 로그아웃했습니다");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: () => {
      console.log("login rejected");
    },
    [getUser.fulfilled]: (state, action) => {
      const userInfo = action.payload;
      state.isLoggedIn = true;
      state.mySeq = userInfo.userSeq;
      state.myEmail = userInfo.userEmail;
      state.myNickname = userInfo.userNickname;
      state.myImageURL = userInfo.userImg;
      state.myUserType = userInfo.userType;
      state.myDesc = userInfo.userDesc;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.mySeq = 0;
      state.myEmail = "";
      state.myNickname = "";
      state.myImageURL = "";
      state.myUserType = "";
      state.myDesc = "";
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
