import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchContactsAPI,
  addContactAPI,
  deleteContactAPI,
  updateContactAPI,
} from "../../contacts/contactsAPI";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `${token}`;
};

const clearAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = ``;
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      return await fetchContactsAPI();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      return await addContactAPI(contact);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/removeContact",
  async (id, thunkAPI) => {
    try {
      return await deleteContactAPI(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updateContact }, thunkAPI) => {
    try {
      return await updateContactAPI({ id, ...updateContact });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.rejectWithValue(e.message));
    }
  },
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.rejectWithValue(e.message));
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.rejectWithValue(e.message));
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue(e.rejectWithValue(e.message));
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/me");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.rejectWithValue(e.message));
    }
  },
);
