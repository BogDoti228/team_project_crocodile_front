import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface GameProcessType {
    isGameStarted : boolean,
    currentWord: string,
    timerTick : string,
    statusWord: string,
    isGameEnded: boolean,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isGameStarted: false,
    currentWord: "",
    timerTick: "",
    statusWord: "Игра не началась",
    isGameEnded: false,
    loading: 'idle',
} as GameProcessType

interface GameProcessData {
    isGameStarted: boolean,
    currentWord: string,
    statusWord: string,
    timerTick: string,
    isGameEnded: boolean
}

export const getGameProcessInfo = createAsyncThunk("getGameProcessInfo", async () => {
    const response : Promise<GameProcessData> = fetch('https://localhost:8080/game/gameProcess', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        }
    })
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export interface GameBooleansType {
    isGameStarted: boolean,
    isGameEnded: boolean
}

export const postGameProcessInfo = createAsyncThunk("postGameProcessInfo", async (gameBooleans : GameBooleansType) => {
    await fetch('https://localhost:8080/game/gameProcess', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({roomId : sessionStorage.getItem(ROOM_ID_IN_STORAGE), ...gameBooleans})
    })
})

export const gameProcessSlice = createSlice({
    name : "gameProcessSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(postGameProcessInfo.fulfilled, (state, action) => {
        })
        builder.addCase(getGameProcessInfo.fulfilled, (state, action) => {
            console.log(action.payload.statusWord + " " + action.payload.currentWord + " " + action.payload.isGameStarted + " GAME PROCESS INFO")
            state.statusWord = action.payload.statusWord
            state.currentWord = action.payload.currentWord
            state.isGameStarted = action.payload.isGameStarted
            state.timerTick = action.payload.timerTick
            state.isGameEnded = action.payload.isGameEnded
        })
    }
})

export const gameProcessSliceReducers = gameProcessSlice.reducer;
export  const {} = gameProcessSlice.actions