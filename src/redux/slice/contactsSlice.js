import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContactsAPI,
  addContactAPI,
  removeContactAPI,
} from "../../contacts/contactsAPI";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => await fetchContactsAPI()
);

export const addContacts = createAsyncThunk(
  "contacts/addContact",
  async (contact) => await addContactAPI(contact)
);

export const removeContacts = createAsyncThunk(
  "contacts/removeContact",
  async (id) => await removeContactAPI(id)
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeContacts.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },

  // addContact: {
  //   reducer(state, action) {
  //     state.list.push(action.payload);
  //   },
  //   prepare(name, number) {
  //     return {
  //       payload: {
  //         id: nanoid(),
  //         name,
  //         number,
  //       },
  //     };
  //   },
  // },

  // removeContact(state, action) {
  //   state.list = state.list.filter(
  //     (contact) => contact.id !== action.payload
  //   );
  // },
});

export default contactsSlice.reducer;
