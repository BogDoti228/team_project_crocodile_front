import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {ScoreAddUserType} from "./role_slice";

type GameStateType = 'during' | 'preStart' | 'betweenRound' | 'end';

interface GameProcessType {
    gameState: GameStateType,
    currentWord: string,
    timerTick : string,
    statusWord: string,
    scoreAddUser: ScoreAddUserType
}

const initialState = {
    gameState: 'preStart',
    currentWord: "",
    timerTick: "",
    statusWord: "Игра не началась",
    scoreAddUser : {
        userGuessed : "",
        userDraw : ""
    }
} as GameProcessType

interface GameProcessData {
    currentWord: string,
    gameState: GameStateType,
    statusWord: string,
    timerTick: string,
    scoreAddUser: ScoreAddUserType
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


export const postGameProcessInfo = createAsyncThunk("postGameProcessInfo", async (gameState : GameStateType) => {
    await fetch('https://localhost:8080/game/gameProcess', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        },
        body: JSON.stringify({gameState: gameState})
    })
})

export const restartGame = createAsyncThunk("restartGame", async () => {
    await fetch('https://localhost:8080/game/restart', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        }
    })
})

export const gameProcessSlice = createSlice({
    name : "gameProcessSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(postGameProcessInfo.fulfilled, () => {
        })
        builder.addCase(getGameProcessInfo.fulfilled, (state, action) => {
            /*console.log(`GAME PROCESS INFO
             status word: ${action.payload.statusWord}
             word: ${action.payload.currentWord} 
             game state: ${action.payload.gameState}
             timer: ${action.payload.timerTick}`);*/
            state.statusWord = action.payload.statusWord
            state.currentWord = action.payload.currentWord
            state.gameState = action.payload.gameState
            state.timerTick = action.payload.timerTick
            state.scoreAddUser = action.payload.scoreAddUser
        })
        builder.addCase(restartGame.fulfilled, () => {
        })
    }
})

export const gameProcessSliceReducers = gameProcessSlice.reducer;
