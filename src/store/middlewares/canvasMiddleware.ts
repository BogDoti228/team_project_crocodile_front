import {HubConnectionBuilder} from "@microsoft/signalr";
import {signalMiddleware, withCallbacks} from "redux-signalr";
import {DispatchSignal} from "../web-slices/chat_slice";
import {RootState} from "../store";
import {CanvasType, setCanvas} from "../web-slices/canvas_slice";

const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:8080/canvas')
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<DispatchSignal, RootState>()
    .add('ReceiveCanvas', (canvas: CanvasType) => (dispatch) => {
        console.log('Receive canvas');
        console.log(canvas);
        dispatch(setCanvas({img: canvas.img}));
    })

export const canvasMiddleware = signalMiddleware({
    callbacks,
    connection,
});