import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useTypeDispatch} from "../store";

interface ProfileType {
    name : string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    name: "none",
    loading: 'idle',
} as ProfileType

export const getName = createAsyncThunk("getName", async () => {
    const response : Promise<ProfileType> = fetch('https://localhost:8080/user/profile')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const postName = createAsyncThunk("postName", async (name : string) => {
    await fetch('https://localhost:8080/user/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name})
    })
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
            console.log('GET')
            state.name = action.payload.name
        })
        builder.addCase(postName.fulfilled, (state, action) => {
            console.log('POST')
        })
    }
})

export const profileSliceReducers = profileSlice.reducer;
export const {setName} = profileSlice.actions