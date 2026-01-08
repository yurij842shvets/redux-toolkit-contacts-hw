import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchContactsAPI, addContactAPI, deleteContactAPI, updateContactAPI } from "../contacts/contactsAPI";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async(_, thunkAPI) => {
        try{
            return await fetchContactsAPI()
        } catch(e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const addContact = createAsyncThunk(
    'contacts/addConatct',
    async(contact, thunkAPI) => {
        try {
            return await addContactAPI(contact)
        } catch(e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/removeConatct',
    async(id, thunkAPI) => {
        try {
            return await deleteContactAPI(id)
        } catch(e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateContact = createAsyncThunk(
    'contacts/updateConatct',
    async({id, updateContact}, thunkAPI) => {
        try {
            return await updateContactAPI({id, ...updateContact})
        } catch(e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)