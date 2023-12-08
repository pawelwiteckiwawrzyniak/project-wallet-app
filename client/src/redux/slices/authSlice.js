import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "../auth/operations";

const initialState = {
  user: { name: "Test User", email: "Test Email", id: "test" },
  token: "Test Token",
  balance: 500,
  isAuth: false,
  isRefresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    //checked
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.balance = action.payload.user.balance;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    //checked
    [logIn.fulfilled](state, action) {
      if (action.payload) {
        state.user = action.payload.user;
        state.balance = action.payload.user.balance;
        state.token = action.payload.token;
        state.isAuth = true;
      }
    },
    //checked
    [logIn.rejected](state) {
      state.user = { name: null, email: null, id: null };
      state.token = null;
      state.isAuth = false;
    },
    //checked
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null, id: null };
      state.token = null;
      state.isAuth = false;
    },
    //checked
    [refreshUser.pending](state) {
      state.isRefresh = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.balance = action.payload.user.balance;
      state.isAuth = true;
      state.isRefresh = false;
    },
    [refreshUser.rejected](state) {
      state.isRefresh = false;
    },
  },
});
export const authReducer = authSlice.reducer;
