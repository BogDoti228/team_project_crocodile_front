import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_PATH, ROOM_ID_IN_STORAGE} from "../../constans";

export interface ScoreAddUserType {
    userDraw : string,
    userGuessed : string
}

interface RoleType {
    scoreAddUsers : ScoreAddUserType
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    scoreAddUsers : {},
    loading: 'idle',
} as RoleType

export interface GameFinalResponseType {
    isScoreLimitBitten : boolean
}

export const postScoreToAdd = createAsyncThunk("postScoreToAdd", async (scoreAddUser : ScoreAddUserType) => {
    await fetch(API_PATH + 'game/gameScore', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        },
        body: JSON.stringify(scoreAddUser)
    })
})

export const getScoreToAddUsers = createAsyncThunk("getScoreToAddUsers", async () => {
    const response : Promise<ScoreAddUserType> = fetch(API_PATH + 'game/gameScore', {
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

export const roleSlice = createSlice({
    name : "roleSlice",
    initialState : initialState,
    reducers : {
    },
    extraReducers: (builder) => {
        builder.addCase(postScoreToAdd.fulfilled, () => {
        })
        builder.addCase(getScoreToAddUsers.fulfilled, (state, {payload}) => {
            state.scoreAddUsers = payload
        })
    }
})

export const roleSliceReducers = roleSlice.reducer;