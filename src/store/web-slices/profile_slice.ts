import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface ProfileType {
    name : string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    name: "none",
    loading: 'idle',
} as ProfileType

export const getName = createAsyncThunk("getName", async () => {
    const response : Promise<ProfileType> = fetch('http://localhost:8080/users/campaigns')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const profileSlice = createSlice({
    name : "profileSlice",
    initialState : initialState,
    reducers : {
        setName : (state, action) => {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getName.fulfilled, (state, action) => {
            state.name = action.payload.name
        })
    }
})

export const profileSliceReducers = profileSlice.reducer;
export const {setName} = profileSlice.actions