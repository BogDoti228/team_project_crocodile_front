import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useTypeDispatch} from "../../store/store";
import {joinToRoom, ROOM_NAME_IN_STORAGE} from "../../store/web-slices/chat_slice";

function CreateRoom() {
    const [nameRoom, setNameRoom] = useState('');
    const dispatch = useTypeDispatch();

    let navigate = useNavigate();
    const handleCreateRoom = () => {
        dispatch(joinToRoom(nameRoom));
        sessionStorage.setItem(ROOM_NAME_IN_STORAGE, nameRoom);
        navigate('/game');
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleCreateRoom();
    }

    return (
        <div className={style.section + ' ' + style.createRoom}>
            <div className={style.widget}>
                <div>Название комнаты:</div>
                <input className={style.input + " input"}
                       type="text"
                       value={nameRoom}
                       onChange={e => setNameRoom(e.target.value)}
                       onKeyPress={e => handlePressEnter(e)}
                />
                <button className={style.button + " btn"} onClick={handleCreateRoom}>Создать комнату</button>
            </div>

        </div>)
}

export default CreateRoom;