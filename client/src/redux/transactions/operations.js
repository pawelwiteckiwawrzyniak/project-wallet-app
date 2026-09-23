import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCategories } from "./categories.js";
import { updateCategory } from "../../utils/formatCategory.js";

const URLTRANSACTIONS = "http://localhost:3000/";

//checked
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransactions",
  async (_, thunkAPI) => {
    try {
      //
      const responce = await axios.get(`${URLTRANSACTIONS}api/transactions`);
      //
      const categories = await fetchCategories();
      return updateCategory(responce.data.data, categories);
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

//checked.
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      //
      const responce = await axios.delete(
        `${URLTRANSACTIONS}api/transactions/${id}`
      );
      //
      console.log("selete", responce.data);
      return responce.data;
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
