import {HubConnectionBuilder} from "@microsoft/signalr";
import {signalMiddleware, withCallbacks} from "redux-signalr";
import {DispatchSignal, addMessage, changeMessageStatus ,MessageType} from "../web-slices/chat_slice";
import {RootState} from "../store";

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:8080/chat')
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<DispatchSignal, RootState>()
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
        connection,
});

export default connection;