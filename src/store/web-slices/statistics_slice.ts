import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {RoomInfo} from "./profile_slice";
import {API_PATH} from "../../constans";

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
    const response : Promise<StatisticsType> = await fetch(API_PATH + 'game/gameStatistics', {
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
        builder.addCase(getStatistics.fulfilled, (state, {payload}) => {
            state.winner = payload.winner
            state.mostSuccessDrawing = payload.mostSuccessDrawing
            state.mostSuccessGuessing = payload.mostSuccessGuessing
        })
    }
})

export const statisticsSliceReducers = statisticsSlice.reducer;