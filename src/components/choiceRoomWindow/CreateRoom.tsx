import {useState} from "react";
import style from './choiceRoomWindow.module.scss';

function CreateRoom({setOpen}: choiceRoomWindowProps){

    const [nameRoom, setNameRoom] = useState('');

    const handleCreateRoom = () =>{
        setOpen(v => !v);
    }

    return (
        <div className={style.section + ' ' + style.createRoom}>
            <div className={style.widget}>
                <div>Название комнаты:</div>
                <input className={style.input + ' ' + 'input'} type="text" value={nameRoom} onChange={e => setNameRoom(e.target.value)}/>
                <button className={style.button + ' ' + "btn"} onClick={handleCreateRoom}>Создать комнату</button>
            </div>

        </div>)
}

export default CreateRoom;