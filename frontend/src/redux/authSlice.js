import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { value: { nickname: "", email: "" } };

export const login = createAsyncThunk(
  "authSlice/login",
  async (_, { rejectWithValue }) => {
    
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
});

export const { testLogin } = authSlice.actions;
export default authSlice;
