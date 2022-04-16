import {createSlice} from "@reduxjs/toolkit";

interface RoleType {
    isAdmin : boolean,
    isDrawMember: boolean
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isAdmin: false,
    isDrawMember: false,
    loading: 'idle',
} as RoleType

export const roleSlice = createSlice({
    name : "roleSlice",
    initialState : initialState,
    reducers : {
        setAdmin : (state, action) => {
            state.isAdmin = action.payload;
        },
        setDrawMember : (state, action) => {
            state.isDrawMember = action.payload
        }
    },
})

export const roleSliceReducers = roleSlice.reducer;
export  const {setAdmin} = roleSlice.actions