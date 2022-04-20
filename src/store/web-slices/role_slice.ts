import {createSlice} from "@reduxjs/toolkit";

interface RoleType {
    isAdmin : boolean,
    isDrawMember: boolean,
    isWordGuessed: boolean,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isAdmin: false,
    isWordGuessed: false,
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
        setIsWordGuessed : (state, action) => {
            state.isWordGuessed = action.payload
        },
    },
})

export const roleSliceReducers = roleSlice.reducer;
export const {setIsWordGuessed, setAdmin} = roleSlice.actions