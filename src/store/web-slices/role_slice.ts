import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {checkExistingRoom, deleteName, postName} from "./profile_slice";
import {PreStartInfoType} from "./select_slice";

export interface ScoreAddUserType {
    userDraw : string,
    userGuessed : string
}

interface RoleType {
    isAdmin : boolean,
    isDrawMember: boolean,
    scoreAddUsers : ScoreAddUserType
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    isAdmin: false,
    isDrawMember: false,
    scoreAddUsers : {},
    loading: 'idle',
} as RoleType

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

export const getScoreToAddUsers = createAsyncThunk("getScoreToAddUsers", async () => {
    const response : Promise<ScoreAddUserType> = fetch('https://localhost:8080/game/gameScore', {
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
        setAdmin : (state, action) => {
            state.isAdmin = action.payload;
        }
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
export const {setAdmin} = roleSlice.actions