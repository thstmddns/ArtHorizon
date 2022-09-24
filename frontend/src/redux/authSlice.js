import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "../api/api";

const initialState = { isLoggedIn: false, nickname: "", email: "" };

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      console.log(res);
      localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
      // axios.defaults.headers.common["Authorization"] = `jwt ${res.data}`;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

export const signup = createAsyncThunk(
  "authSlice/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(credentials);
      console.log(res);
      localStorage.setItem("access-token", `jwt ${res.data.jwt}`);
    } catch (error) {
      return rejectWithValue(error.response);
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
    } catch (error) {
      console.error(error);
      return rejectWithValue(JSON.parse(error.response));
    }
  }
);

export const changeType = createAsyncThunk(
  "authSlice/changeType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.changeType();
      console.log(res);
    } catch (error) {
      console.error(error);
      return rejectWithValue(JSON.parse(error.response));
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "authSlice/getBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getBookmarks();
      console.log(res);
    } catch (error) {
      console.error(error);
      return rejectWithValue(JSON.parse(error.response));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    testLogin: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: () => {
      console.log("login rejected");
    },
  },
});

export const { testLogin } = authSlice.actions;
export default authSlice;
