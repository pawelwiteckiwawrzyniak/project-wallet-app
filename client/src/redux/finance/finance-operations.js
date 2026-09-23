import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import {
//   dataForDiagramTable,
//   COLORS_ARRAY,
//   EXPENSE_ARRAY,
// } from "components/DiagramTab/js/initial-data";

const getCurrentTransactions = createAsyncThunk(
  "finance/transactions",
  async ({ page, limit }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/transactions?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const refreshTransactions = createAsyncThunk(
  "finance/refreshTransactions",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/transactions?page=1&limit=5`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const createTransactions = createAsyncThunk(
  "finance/createTransactions",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "/api/transactions/create",
        credentials
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
const categories = createAsyncThunk(
  "finance/categories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("api/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const getTransactionsInfo = createAsyncThunk(
  "finance/transactionsInfo",
  async (credentials, thunkAPI) => {
    try {
      const { month, year } = credentials;
      const { data } = await axios.get(
        `/api/transactions/filter?month=${month}&year=${year}`
      );

      //   nie wiem czy tutaj nie dodać value
      const newTableData = dataForDiagramTable.map(
        ({ color, expense }, index) => {
          return {
            color,
            expense,
            value: data.statistics[index].total,
          };
        }
      );

      const valuesArr = newTableData.map((item) => item.value);

      const newChartData = {
        labels: EXPENSE_ARRAY.map((item) => item.name),
        datasets: [
          {
            label: "expenses",
            data: valuesArr,
            backgroundColor: COLORS_ARRAY,
            borderColor: COLORS_ARRAY,
            borderWidth: 1,
          },
        ],
      };

      return {
        newTableData,
        newChartData,
        income: data.income,
        expenses: data.expenses,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const financeOperations = {
  refreshTransactions,
  getCurrentTransactions,
  createTransactions,
  categories,
  getTransactionsInfo,
};

export default financeOperations;
