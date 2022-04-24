import React, {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useTypeDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {ROOM_ID_IN_STORAGE} from "../../store/web-slices/chat_slice";
import {checkExistingRoom, setAuth} from "../../store/web-slices/profile_slice";
import {RoomInfo} from "../../store/web-slices/profile_slice";


function JoinRoom() {
    const [idRoom, setIdRoom] = useState('');
    const dispatch = useTypeDispatch();
    const [isErrorRoom, setIsErrorRoom] = useState(false)

    let navigate = useNavigate();
    const handleJoinRoom = async () => {
        await dispatch(checkExistingRoom(idRoom)).then( (x,) => {
            if ((x.payload as RoomInfo).isRoomExist) {
                sessionStorage.setItem(ROOM_ID_IN_STORAGE, idRoom);
                dispatch(setAuth(true));
                navigate('/enter');
            }
            else {
                setIsErrorRoom(true)
            }
            }
        )
    }

    const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            await handleJoinRoom();
    }

    return (
        <div className={style.section + ' ' + style.joinRoom}>
            <div className={style.widget}>
                    <div>Индефикатор комнаты:</div>
                    {isErrorRoom && <div className={style.errorMessage}>Такой комнаты не существует</div>}
                    <input className={`${style.input} input`}
                           type="text"
                           value={idRoom}
                           onChange={e => {
                               setIdRoom(e.target.value)
                               setIsErrorRoom(false)
                           }}
                           onKeyPress={e => handlePressEnter(e)}
                    />

                <button className={`${style.button} btn`} onClick={handleJoinRoom}>Присоединиться</button>
            </div>

        </div>)

}

export default JoinRoom;

