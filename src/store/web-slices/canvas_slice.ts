import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {SignalDispatch} from "redux-signalr";
import {RootState} from "../store";
import {ROOM_NAME_IN_STORAGE} from "./chat_slice";
import canvasConnection from "../middlewares/canvasMiddleware";

const initialState = {
    url: '',
} as CanvasType;

export const postCanvas = createAsyncThunk("postCanvas", async (url: string) => {
    console.log('Post Canvas!');
    await fetch('https://localhost:8080/canvas/post', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url,
            roomName: sessionStorage.getItem(ROOM_NAME_IN_STORAGE)
        } as CanvasTypeForPost)
    })
})

export const joinToCanvasRoom = createAsyncThunk("joinToRoom", async (nameRoom: string) => {
    await fetch('https://localhost:8080/canvas/joinRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({roomName: nameRoom, connectionId: canvasConnection.connectionId} as JointRoomType)
    });
});

export const canvasSlice = createSlice({
    name: "canvasSlice",
    initialState: initialState,
    reducers: {
        setUrlImg: (state, action) => {
            state.url = action.payload;
        },
        setCanvasConnectionId : (state, action) => {
            state.connectionId = action.payload;
            console.log('ConnectionID: ', state.connectionId);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postCanvas.fulfilled, (state, action) => {
        })
        builder.addCase(joinToCanvasRoom.fulfilled, (state, action) => {
        })
    }
})

export const canvasSliceReducers = canvasSlice.reducer;

export const {setUrlImg, setCanvasConnectionId} = canvasSlice.actions;


export type CanvasDispatchSignal<Action extends AnyAction = AnyAction> = SignalDispatch<RootState,Action>;

export type CanvasType = {
    url: string,
    connectionId?: string,
}

export type CanvasTypeForPost = {
    url: string,
    roomName?: string,
}