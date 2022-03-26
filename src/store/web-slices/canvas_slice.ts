import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface CanvasType {
    url : string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    url: "",
    loading: 'idle',
} as CanvasType

interface UrlType {
    canvas : string
}

export const getCanvasImage = createAsyncThunk("getCanvasImage", async () => {
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
})

export const canvasSlice = createSlice({
    name : "canvasSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(getCanvasImage.fulfilled, (state, action) => {
            const objUrl : UrlType = JSON.parse(action.payload)
            state.url = objUrl.canvas;
        })
        builder.addCase(postCanvasImage.fulfilled, (state, action) => {

        })
    }
})

export const canvasSliceReducers = canvasSlice.reducer;