import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

//Information about the format of data received from the backend is required. Endpoints are required.
axios.defaults.baseURL = "http://localhost:3000/";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      //
      const responce = await axios.post("/users/signup", credentials); //Endpoint is required.
      //
      console.log(responce);
      //
      setAuthHeader(responce.token);
      //
      return responce;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//Information about the format of data received from the backend is required. Endpoints are required.
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      //
      const responce = axios.post("/users/login", credentials); //Endpoint is required.
      //
      setAuthHeader(responce.token);
      //
      return responce;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//Information about the format of data received from the backend is required. Endpoints are required.
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (token, thunkAPI) => {
    try {
      //
      await axios.post("user/logout", token); //Endpoint is required.
      //
      clearAuthHeader();
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//Information about the format of data received from the backend is required. Endpoints are required.
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      //
      setAuthHeader(persistedToken);
      //
      const responce = await axios.get("/users/me"); //Endpoint is required.
      //
      return responce;
      //
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

//test function
export const refreshUserTest = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
