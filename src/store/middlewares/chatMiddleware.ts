import {HubConnectionBuilder} from "@microsoft/signalr";
import {signalMiddleware, withCallbacks} from "redux-signalr";
import {ChatDispatchSignal, addMessage, changeMessageStatus, MessageType} from "../web-slices/chat_slice";
import {RootState} from "../store";
import {API_PATH} from "../../constans";

const chatConnection = new HubConnectionBuilder()
    .withUrl(API_PATH + 'chat')
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<ChatDispatchSignal, RootState>()
    .add('ReceiveMessage', (msg: MessageType) => (dispatch) => {
        console.log('Receive message', msg.text)
        dispatch(addMessage(msg));
    })
    .add('ReceiveChangedMessageStatus', (msg: MessageType) => (dispatch) => {
        console.log('Change message', msg.text);
        dispatch(changeMessageStatus(msg))
    })

export const chatMiddleware = signalMiddleware({
    callbacks,
    connection: chatConnection,
    shouldConnectionStartImmediately: false,
});

export default chatConnection;