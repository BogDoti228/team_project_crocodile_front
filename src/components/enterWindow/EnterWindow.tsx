import React, {useEffect} from "react";
import Enter from "./Enter";
import Info from "./Info";
import style from "./enterWindow.module.scss";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import canvasConnection from "../../store/middlewares/canvasMiddleware";
import {HubConnectionState} from "@microsoft/signalr";
import {joinToCanvasRoom} from "../../store/web-slices/canvas_slice";
import {joinToChatRoom, ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import chatConnection from "../../store/middlewares/chatMiddleware";

function EnterWindow(){
    const navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    });

    const dispatch = useTypeDispatch();

    useEffect(() => {
        const idRoom = sessionStorage.getItem(ROOM_ID_IN_STORAGE);
        if (idRoom === null) {
            console.error("Has not id room");
            return;
        }

        if (canvasConnection.state !== HubConnectionState.Connected){
            canvasConnection.start()
                .then(() => dispatch(joinToCanvasRoom(idRoom)))
                .catch((e) => console.log(e));
        }

        if (chatConnection.state !== HubConnectionState.Connected){
            chatConnection.start()
                .then(() => dispatch(joinToChatRoom(idRoom)))
                .catch((e) => console.log(e));
        }
    })
    return (
        <div className={style.window}>
            <div className={style.window_content}>
                <Enter/>
                <Info/>
            </div>
        </div>
    )
}

export default EnterWindow