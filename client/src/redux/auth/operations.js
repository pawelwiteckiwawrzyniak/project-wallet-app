import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

axios.defaults.baseURL = "http://localhost:3000/";

//checked
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      await axios.post("api/users/signup", credentials);
      const responce = await axios.post("api/users/login", credentials);
      //
      // setAuthHeader(responce.data.token);
      //It gives an error when refreshing the page after user registration because the token is not received from the server.
      //
      return responce.data;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//checked
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      //
      const responce = await axios.post("api/users/login", credentials); //Endpoint is required.
      //
      setAuthHeader(responce.data.token);
      //
      return responce.data;
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//checked
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (token, thunkAPI) => {
    try {
      //
      await axios.post("api/user/logout", token);
      //
      clearAuthHeader();
      //
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massege);
    }
  }
);

//checked
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
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
      const responce = await axios.get("api/current");
      //
      return responce.data;
      //
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
