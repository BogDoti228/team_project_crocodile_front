import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface SelectType {
    currentTimer : string,
    currentStartUser: string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    currentTimer : "",
    currentStartUser: "",
    loading: 'idle',
} as SelectType

export interface PreStartInfoType {
    currentTimer : string,
    currentStartUser: string
}

export const getPreStartInfo = createAsyncThunk("getPreStartInfo", async () => {
    const response : Promise<PreStartInfoType> = fetch('https://localhost:8080/game/startInfo', {
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

export const postPreStartInfo = createAsyncThunk("postPreStartInfo", async (currentData : PreStartInfoType) => {
    await fetch('https://localhost:8080/game/startInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...currentData, roomId: sessionStorage.getItem(ROOM_ID_IN_STORAGE)})
    })
})

export const selectSlice = createSlice({
    name : "selectSlice",
    initialState : initialState,
    reducers : {
        setCurrentTimer : (state, action) => {
            state.currentTimer = action.payload
        },
        setCurrentStartUser : (state, action) => {
            state.currentStartUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPreStartInfo.fulfilled, (state, action) => {
            state.currentStartUser = action.payload.currentStartUser;
            state.currentTimer = action.payload.currentTimer
        })
        builder.addCase(postPreStartInfo.fulfilled, () => {
            //console.log("POSTED DATA SURELY")
        })
    }
})

export const selectSliceReducers = selectSlice.reducer;
export  const {setCurrentStartUser, setCurrentTimer} = selectSlice.actions