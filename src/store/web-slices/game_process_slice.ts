import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface GameProcessType {
    isGameStarted : boolean,
    currentWord: string,
    timerTick : string,
    statusWord: string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isGameStarted: false,
    currentWord: "",
    timerTick: "",
    statusWord: "Игра не началась",
    loading: 'idle',
} as GameProcessType

interface GameProcessData {
    isGameStarted: boolean,
    currentWord: string,
    statusWord: string
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

export const postGameProcessInfo = createAsyncThunk("postGameProcessInfo", async (isGameStarted: boolean) => {
    await fetch('https://localhost:8080/game/gameProcess', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({roomId : sessionStorage.getItem(ROOM_ID_IN_STORAGE), isGameStarted: isGameStarted})
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
        })
    }
})

export const gameProcessSliceReducers = gameProcessSlice.reducer;
export  const {} = gameProcessSlice.actions