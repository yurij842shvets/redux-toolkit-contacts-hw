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

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userEmail = state.auth.user.email;

    try {
      const all = await fetchContactsAPI();

      return all.filter(c => c.owner === userEmail);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const userEmail = state.auth.user.email;

    try {
      return await addContactAPI({
        ...contact,
        owner: userEmail
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
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
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.some((u) => u.email === credentials.email);

      if (exists) {
        return thunkAPI.rejectWithValue("User with this email already exists");
      }

      users.push({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      localStorage.setItem("users", JSON.stringify(users));

      const fakeToken = "token-" + Date.now();
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("currentUserEmail", credentials.email);

      return {
        user: {
          email: credentials.email,
          name: credentials.name,
        },
        token: fakeToken,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem("users"));

      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password,
      );

      if (!user) {
        return thunkAPI.rejectWithValue("Wrong email or password");
      }

      const fakeToken = "token-" + Date.now();
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("currentUserEmail", user.email);

      return {
        user: {
          email: user.email,
          name: user.name,
        },
        token: fakeToken,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUserEmail");
  localStorage.removeItem("persist:contacts");

  clearAuthHeader();

  return true
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("currentUserEmail");

      if (!token || !email) {
        return thunkAPI.rejectWithValue("No session found");
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === email);

      if (!user) {
        return thunkAPI.rejectWithValue("User not found");
      }

      setAuthHeader(token);

      return {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
