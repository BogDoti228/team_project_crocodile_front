import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

/*export const getCanvasImage = createAsyncThunk("getCanvasImage", async () => {
    const response : Promise<string> = fetch('https://localhost:8080/canvas/get')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const postCanvasImage = createAsyncThunk("postCanvasImage", async (url : string) => {
    await fetch('https://localhost:8080/canvas/post', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({canvas: url})
    })
})*/

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
    /*extraReducers: (builder) => {
    }*/
})

export const roleSliceReducers = roleSlice.reducer;
export  const {setDrawMember, setAdmin} = roleSlice.actions