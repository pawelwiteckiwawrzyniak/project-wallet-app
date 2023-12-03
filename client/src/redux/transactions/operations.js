import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Information about the format of data received from the backend is required. Endpoints are required.

const URLTRANSACTIONS = "http://localhost:5173/";

export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransactions",
  async (_, thunkAPI) => {
    try {
      //
      const responce = await axios.get(`${URLTRANSACTIONS}/transactions`);
      //
      return responce;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//Information about the format of data received from the form transaction is required.
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkApi) => {
    try {
      //
      const responce = await axios.post(`${URLTRANSACTIONS}/tasks`, {
        transactionData,
      });
      //
      return responce;
      //
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//Information about the format of data received from the backend is required. Endpoints are required.
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transaction, thunkAPI) => {
    try {
      //
      const responce = await axios.delete(
        `${URLTRANSACTIONS}/transactions/${transaction.id}`
      );
      //
      return responce;
      //
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
