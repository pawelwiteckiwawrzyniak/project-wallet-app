import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [
    {
      data: "20.11.20",
      type: "+",
      category: "testCategory",
      comment: "testComment",
      summ: 300,
      isRefreshing: false,
    },
  ],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: {},
});

export const transactionsReduser = transactionsSlice.reducer;
