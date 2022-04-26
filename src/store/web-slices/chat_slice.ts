import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AnyAction } from "redux";
import { SignalDispatch } from "redux-signalr";
import chatConnection from "../middlewares/chatMiddleware";
import { API_PATH, NICK_IN_STORAGE, ROOM_ID_IN_STORAGE } from "../../constans";

const initialState = {
  messages: [],
  loading: "idle",
} as MessagesListType;

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (text: string) => {
    await fetch(API_PATH + "chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: nanoid(5),
        name: sessionStorage.getItem(NICK_IN_STORAGE),
        text: text,
        status: "neutral",
        roomName: sessionStorage.getItem(ROOM_ID_IN_STORAGE),
      } as MessageTypePost),
    }).catch(console.log);
  }
);

export const sendChangeMessage = createAsyncThunk(
  "changeMessageStatus",
  async (msg: MessageType) => {
    await fetch(API_PATH + "chat/changeStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...msg,
        roomName: sessionStorage.getItem(ROOM_ID_IN_STORAGE),
      } as MessageTypePost),
    }).catch(console.log);
  }
);

export const joinToChatRoom = createAsyncThunk(
  "joinToRoom",
  async (nameRoom: string) => {
    await fetch(API_PATH + "chat/joinRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: nameRoom,
        connectionId: chatConnection.connectionId,
      } as JointRoomType),
    }).catch(console.error);
  }
);

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    changeMessageStatus: (state, action) => {
      let index = state.messages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      state.messages[index].status = action.payload.status;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {});
    builder.addCase(sendChangeMessage.fulfilled, (state, action) => {});
    builder.addCase(joinToChatRoom.fulfilled, (state, action) => {});
  },
});

export const chatSliceReducers = chatSlice.reducer;
export const { addMessage, changeMessageStatus, clearChat } = chatSlice.actions;

export type DispatchSignal<Action extends AnyAction = AnyAction> =
  SignalDispatch<RootState, Action>;

export type JointRoomType = {
  roomName: string;
  connectionId: string;
};

export type MessagesListType = {
  messages: Array<MessageType>;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  connectionId?: string;
};

export type MessageType = {
  id: string;
  text: string;
  name: string;
  status: "neutral" | "positive" | "negative" | "right";
};

type MessageTypePost = {
  id: string;
  text: string;
  name: string;
  status: "neutral" | "positive" | "negative" | "right";
  roomName: string;
};
