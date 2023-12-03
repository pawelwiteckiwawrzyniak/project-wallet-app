import { createSlice } from "@reduxjs/toolkit";
import { register, logIn } from "../auth/operations";

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
        state.isLoggedIn = true;
      }
    },
    [logIn.rejected](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const authReducer = authSlice.reducer;
