import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isModalAddTransactionOpen: false,
  isModalLogoutOpen: false,
  isCurrencyView: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = !state.isModalAddTransactionOpen;
    },
    toggleModalLogout: (state) => {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
    toggleCurrencyView: (state, action) => {
      state.isCurrencyView = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  toggleModalAddTransaction,
  toggleModalLogout,
  toggleCurrencyView,
} = globalSlice.actions;
export default globalSlice.reducer;
