import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {Link, useNavigate} from "react-router-dom";


function JoinRoom() {
    const [idRoom, setIdRoom] = useState('');

    let navigate = useNavigate();
    const handleJoinRoom = () => {
        navigate('/game');
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

