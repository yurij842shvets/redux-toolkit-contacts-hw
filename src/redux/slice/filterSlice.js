import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer