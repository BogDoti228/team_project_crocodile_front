import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useTypeDispatch} from "../../store/store";
import {joinToChatRoom, ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import {joinToCanvasRoom} from "../../store/web-slices/canvas_slice";
import {nanoid} from "@reduxjs/toolkit";

function CreateRoom() {
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleCreateRoom = () => {
        const id = nanoid(5);
        dispatch(joinToChatRoom(id));
        dispatch(joinToCanvasRoom(id));
        sessionStorage.setItem(ROOM_ID_IN_STORAGE, id);
        navigate('/game');
    }

    return (
        <div className={style.section + ' ' + style.createRoom}>
            <div className={style.widget}>
                <div className={style.text}>Создайте комнату, к вам смогут присоединиться ваши друзья по id комнаты</div>
                <button className={style.button + " btn"} onClick={handleCreateRoom}>Создать комнату</button>
            </div>

        </div>)
}

export default CreateRoom;