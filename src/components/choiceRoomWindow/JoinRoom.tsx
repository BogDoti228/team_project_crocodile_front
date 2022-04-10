import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';

import {useTypeDispatch} from "../../store/store";

import {Link, useNavigate} from "react-router-dom";
import {setAdmin} from "../../store/web-slices/role_slice";



function JoinRoom() {
    const [idRoom, setIdRoom] = useState('');
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleJoinRoom = () => {
        navigate('/game');
        dispatch(setAdmin(false))
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleJoinRoom();
    }

    return (
        <div className={style.section + ' ' + style.joinRoom}>
            <div className={style.widget}>
                <div>Индефикатор комнаты:</div>
                <input className={style.input + " input"}
                       type="text"
                       value={idRoom}
                       onChange={e => setIdRoom(e.target.value)}
                       onKeyPress={e => handlePressEnter(e)}
                />
                <button className={style.button + " btn"} onClick={handleJoinRoom}>Создать комнату</button>
            </div>

        </div>)

}

export default JoinRoom;

