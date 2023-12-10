import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchAllTransactions,
} from "../transactions/operations";

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

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: {
    [fetchAllTransactions.pending]: handlePending,
  },
  [fetchAllTransactions.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    state.transactions = action.payload;
  },
  [fetchAllTransactions.rejected]: handleRejected,

  [addTransaction.pending]: handlePending,
  [addTransaction.fulfilled](state, action) {
    state.isLoading = false;
    state.error = null;
    state.transactions.push(action.payload);
  },
  [addTransaction.rejected]: handleRejected,

  [deleteTransaction.pending]: handlePending,
  [deleteTransaction.fulfilled](state, action) {
    state.isLoading = false;
    const index = state.transactions.findIndex(
      (transaction) => transaction.id === action.payload.id
    );
    state.transactions.splice(index, 1);
  },
  [deleteTransaction.rejected]: handleRejected,
});
export const { setTransactions } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
