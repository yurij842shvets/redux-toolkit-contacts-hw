import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },

    removeContact(state, action) {
      state.list = state.list.filter((contact) => contact.id !== action.payload);
    },
  },
});


export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
