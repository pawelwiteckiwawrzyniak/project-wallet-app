import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URLTRANSACTIONS = "http://localhost:3000/";

//checked
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransactions",
  async (_, thunkAPI) => {
    try {
      //
      const responce = await axios.get(`${URLTRANSACTIONS}api/transactions`);
      //
      return responce.data.data;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//checked
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkApi) => {
    try {
      //
      const responce = await axios.post(
        `${URLTRANSACTIONS}api/transactions`,
        transactionData
      );
      //

      return responce.data;
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
        `${URLTRANSACTIONS}transactions/${transaction.id}`
      );
      //
      return responce;
      //
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/edit",
  async (_, thunkAPI) => {
    try {
      console.log();
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
