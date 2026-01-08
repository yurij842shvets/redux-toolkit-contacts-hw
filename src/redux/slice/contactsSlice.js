import { createSlice} from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact
} from "../../operations/contactsOperations";

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
      .addCase(addContact.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const deletedId = action.payload && action.payload.id ? action.payload.id : action.payload;
        state.list = state.list.filter(
          (contact) => contact.id !== deletedId
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          item => item.id === action.payload.id
        )
        if(index !== -1) {
          state.list[index] = action.payload
        }
      })
  },
});

export const contactsReducer = contactsSlice.reducer