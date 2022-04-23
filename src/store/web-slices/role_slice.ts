import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {checkExistingRoom, deleteName, postName} from "./profile_slice";

interface RoleType {
    isAdmin : boolean,
    isDrawMember: boolean,
    isWordGuessed: boolean,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isAdmin: false,
    isWordGuessed: false,
    isDrawMember: false,
    loading: 'idle',
} as RoleType

export interface ScoreAddUserType {
    userDraw : string,
    userGuessed : string
}

export interface GameFinalResponseType {
    isScoreLimitBitten : boolean
}

export const postScoreToAdd = createAsyncThunk("postScoreToAdd", async (scoreAddUser : ScoreAddUserType) => {
    await fetch('https://localhost:8080/game/gameScore', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        },
        body: JSON.stringify(scoreAddUser)
    })
})

export const roleSlice = createSlice({
    name : "roleSlice",
    initialState : initialState,
    reducers : {
        setAdmin : (state, action) => {
            state.isAdmin = action.payload;
        },
        setIsWordGuessed : (state, action) => {
            state.isWordGuessed = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(postScoreToAdd.fulfilled, () => {
        })
    }
})

export const roleSliceReducers = roleSlice.reducer;
export const {setIsWordGuessed, setAdmin} = roleSlice.actions