import {useState} from "react";

function JoinRoom(){
    const [idRoom, setIdRoom] = useState('');

    const handleJoinRoom = () =>{

    }

    return (
        <div className="choiceWindow__section joinRoom">
            <div className="window">
                <div>Индефикатор комнаты:</div>
                <input type="text" value={idRoom} onChange={e => setIdRoom(e.target.value)}/>
                <button className="joinRoom__btn btn" onClick={handleJoinRoom}>Войти в комнату</button>
            </div>

        </div>)

}

export default JoinRoom;

