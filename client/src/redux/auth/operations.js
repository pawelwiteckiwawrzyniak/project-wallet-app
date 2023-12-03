import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = "";
// };

//Information about the format of data received from the backend is required. Endpoints are required.
axios.defaults.baseURL = " http://localhost:5173/";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      //
      const responce = await axios.post("/users/signup", credentials);
      //
      console.log(responce);
      //
      setAuthHeader(responce.token);
      //
      return responce;
      //
    } catch (e) {
      thunkAPI.rejectWithValue(e.massege);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      //
      const responce = axios.post("/users/login", credentials);
      //
      setAuthHeader(responce.token);
      //
      return responce;
      //
    } catch (e) {
      thunkAPI.rejectWithValue(e.massege);
    }
  }
);
