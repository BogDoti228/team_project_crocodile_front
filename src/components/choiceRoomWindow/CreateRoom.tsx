import React from "react";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useTypeDispatch} from "../../store/store";
import {ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import {nanoid} from "@reduxjs/toolkit";
import {setAuth} from "../../store/web-slices/profile_slice";
import {setCurrentAdmin} from "../../store/web-slices/select_slice";

function CreateRoom() {
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleCreateRoom = () => {
        dispatch(setCurrentAdmin("admin"))
        const id = nanoid(5);
        sessionStorage.setItem(ROOM_ID_IN_STORAGE, id);
        dispatch(setAuth(true));
        navigate('/enter');
    }

    return (
        <div className={style.section + ' ' + style.createRoom}>
            <div className={style.widget}>
                <div className={style.text}>Создайте комнату, к вам смогут присоединиться ваши друзья по id комнаты</div>
                <button className={`${style.button} btn`} onClick={handleCreateRoom}>Создать комнату</button>
            </div>

        </div>)
}

export default CreateRoom;