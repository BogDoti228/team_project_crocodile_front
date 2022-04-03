import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type CanvasType = {
    img : string,
}

const initialState = {
    img: "",
} as CanvasType


export const postCanvasImage = createAsyncThunk("postCanvasImage", async (img : string) => {
    await fetch('https://localhost:8080/canvas/post', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({img: img})
    })
})

export const canvasSlice = createSlice({
    name : "canvasSlice",
    initialState : initialState,
    reducers : {
        setCanvas : (state, action) => {
            state.img = action.payload.img;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postCanvasImage.fulfilled, (state, action) => {
        })
    }
})

export const canvasSliceReducers = canvasSlice.reducer;
export const {setCanvas} = canvasSlice.actions;