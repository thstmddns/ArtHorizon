import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "../api/api";

const initialState = { isLoggedIn: false, nickname: "", email: "" };

export const login = createAsyncThunk(
  "authSlice/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      console.log(res);
      localStorage.setItem("accessToken", `jwt ${res.data.jwt}`);
      // axios.defaults.headers.common["Authorization"] = `jwt ${res.data}`;
    } catch (error) {
      return rejectWithValue(error.response);
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
  },
});

export const { testLogin } = authSlice.actions;
export default authSlice;
