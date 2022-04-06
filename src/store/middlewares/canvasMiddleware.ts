import {HubConnectionBuilder} from "@microsoft/signalr";
import {signalMiddleware, withCallbacks} from "redux-signalr";
import {RootState} from "../store";
import {CanvasDispatchSignal, CanvasTypeForPost, setUrlImg} from "../web-slices/canvas_slice";

const canvasConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:8080/canvas')
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<CanvasDispatchSignal, RootState>()
    .add('ReceiveCanvas', (canvas: CanvasTypeForPost) => (dispatch) => {
        console.log('Receive Canvas!')
        dispatch(setUrlImg(canvas.url));
    });

export const canvasMiddleware = signalMiddleware({
    callbacks,
    connection: canvasConnection
});

export default canvasConnection;