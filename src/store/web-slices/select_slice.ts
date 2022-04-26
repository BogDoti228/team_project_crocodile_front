import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_PATH, ROOM_ID_IN_STORAGE} from "../../constans";

interface SelectType {
    currentTimer : string,
    currentStartUser: string,
    currentEndScore: string,
    currentAdmin: string
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    currentTimer : "",
    currentStartUser: "",
    currentEndScore: "",
    currentAdmin: "",
    loading: 'idle',
} as SelectType

export interface PreStartInfoType {
    currentTimer : string,
    currentStartUser: string,
    currentEndScore: string,
    currentAdmin?: string
}

export const getPreStartInfo = createAsyncThunk("getPreStartInfo", async () => {
    const response : Promise<PreStartInfoType> = fetch(API_PATH + 'game/startInfo', {
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
    await fetch(API_PATH + 'game/startInfo', {
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
        },
        setCurrentEndScore : (state, action) => {
            state.currentEndScore = action.payload
        },
        setCurrentAdmin : (state, action) => {
            state.currentAdmin = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPreStartInfo.fulfilled, (state, action) => {
            state.currentStartUser = action.payload.currentStartUser;
            state.currentTimer = action.payload.currentTimer
            state.currentEndScore = action.payload.currentEndScore
            if (action.payload.currentAdmin){
                state.currentAdmin = action.payload.currentAdmin
            }
        })
        builder.addCase(postPreStartInfo.fulfilled, () => {
            //console.log("POSTED DATA SURELY")
        })
    }
})

export const selectSliceReducers = selectSlice.reducer;
export  const {setCurrentStartUser, setCurrentTimer, setCurrentEndScore, setCurrentAdmin} = selectSlice.actions