import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "../auth/operations";

const initialState = {
  user: { name: "Test User", email: "Test Email" },
  token: "Test Token",
  balance: 20000,
  isAuth: false,
  isRefresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    [logIn.fulfilled](state, action) {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      }
    },
    [logIn.rejected](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isAuth = false;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isAuth = false;
    },
    [refreshUser.pending](state) {
      state.isRefresh = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.isRefresh = false;
    },
    [refreshUser.rejected](state) {
      state.isRefresh = false;
    },
  },
});
export const authReducer = authSlice.reducer;
