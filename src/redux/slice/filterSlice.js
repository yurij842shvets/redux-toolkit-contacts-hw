import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
    resetFilter(state) {
      state.value = '';
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;