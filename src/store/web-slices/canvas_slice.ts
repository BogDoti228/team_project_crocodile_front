import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { SignalDispatch } from "redux-signalr";
import { RootState } from "../store";
import canvasConnection from "../middlewares/canvasMiddleware";
import { API_PATH, ROOM_ID_IN_STORAGE } from "../../constans";

const initialState = {
  url: "",
} as CanvasType;

export const postCanvas = createAsyncThunk(
  "postCanvas",
  async (url: string) => {
    await fetch(API_PATH + "canvas/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        roomName: sessionStorage.getItem(ROOM_ID_IN_STORAGE),
      } as CanvasTypeForPost),
    }).catch(console.log);
  }
);

export const joinToCanvasRoom = createAsyncThunk(
  "joinToRoom",
  async (nameRoom: string) => {
    await fetch(API_PATH + "canvas/joinRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: nameRoom,
        connectionId: canvasConnection.connectionId,
      } as JointRoomType),
    }).catch(console.log);
  }
);

export const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState: initialState,
  reducers: {
    setUrlImg: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCanvas.fulfilled, (state, action) => {});
    builder.addCase(joinToCanvasRoom.fulfilled, (state, action) => {});
  },
});

export const canvasSliceReducers = canvasSlice.reducer;

export const { setUrlImg } = canvasSlice.actions;

export type CanvasType = {
  url: string;
  connectionId?: string;
};

export type CanvasTypeForPost = {
  url: string;
  roomName?: string;
};
