import { HubConnectionBuilder } from "@microsoft/signalr";
import { signalMiddleware, withCallbacks } from "redux-signalr";
import {
  DispatchSignal,
  addMessage,
  changeMessageStatus,
  MessageType,
} from "../web-slices/chat_slice";
import { RootState } from "../store";
import { API_PATH } from "../../constans";

const chatConnection = new HubConnectionBuilder()
  .withUrl(API_PATH + "chat")
  .withAutomaticReconnect()
  .build();

const callbacks = withCallbacks<DispatchSignal, RootState>()
  .add("ReceiveMessage", (msg: MessageType) => (dispatch) => {
    dispatch(addMessage(msg));
  })
  .add("ReceiveChangedMessageStatus", (msg: MessageType) => (dispatch) => {
    dispatch(changeMessageStatus(msg));
  });

export const chatMiddleware = signalMiddleware({
  callbacks,
  connection: chatConnection,
  shouldConnectionStartImmediately: false,
});

export default chatConnection;
