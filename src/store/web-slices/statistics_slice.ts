import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {RoomInfo} from "./profile_slice";

interface StatisticsType {
    winner : string,
    mostSuccessDrawing: string,
    mostSuccessGuessing: string
}

const initialState = {
    winner : "",
    mostSuccessDrawing: "",
    mostSuccessGuessing: "",
} as StatisticsType

export const getStatistics = createAsyncThunk("getStatistics", async () => {
    const response : Promise<StatisticsType> = await fetch('https://localhost:8080/user/rooms', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id": sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        }
    }).then((x) => x.json())
        .catch(console.log)
    return await response
})

export const statisticsSlice = createSlice({
    name : "statisticsSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(getStatistics.fulfilled, () => {
        })
    }
})

export const statisticsSliceReducers = statisticsSlice.reducer;