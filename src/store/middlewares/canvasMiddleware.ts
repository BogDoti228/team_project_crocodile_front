import {HubConnectionBuilder} from "@microsoft/signalr";
import {signalMiddleware, withCallbacks} from "redux-signalr";
import {RootState} from "../store";
import {CanvasDispatchSignal, CanvasTypeForPost, setUrlImg} from "../web-slices/canvas_slice";
import {API_PATH} from "../../constans";

const canvasConnection = new HubConnectionBuilder()
    .withUrl(API_PATH + 'canvas')
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<CanvasDispatchSignal, RootState>()
    .add('ReceiveCanvas', (canvas: CanvasTypeForPost) => (dispatch) => {
        dispatch(setUrlImg(canvas.url));
    });

export const canvasMiddleware = signalMiddleware({
    callbacks,
    connection: canvasConnection,
    shouldConnectionStartImmediately: false,
});

export default canvasConnection;