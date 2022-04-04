import {useState} from "react";
import style from './choiceRoomWindow.module.scss';
import {useTypeDispatch} from "../../store/store";
import {setAdmin} from "../../store/web-slices/role_slice";


function JoinRoom({setOpen}: choiceRoomWindowProps){
    const [idRoom, setIdRoom] = useState('');
    const dispatch = useTypeDispatch();

    const handleJoinRoom = () =>{
        setOpen(v => !v);

        dispatch(setAdmin(false))
    }

    return (
        <div className={style.section + ' ' + style.joinRoom}>
            <div className={style.widget}>
                <div>Индефикатор комнаты:</div>
                <input className={style.input + ' ' + 'input'} type="text" value={idRoom} onChange={e => setIdRoom(e.target.value)}/>
                <button className={style.button + ' ' + "btn"} onClick={handleJoinRoom}>Войти в комнату</button>
            </div>

        </div>)

}

export default JoinRoom;

