import {useState} from "react";

function CreateRoom(){

    const [nameRoom, setNameRoom] = useState('');

    const handleCreateRoom = () =>{

    }

    return (
        <div className="choiceWindow__section createRoom">
            <div className="window">
                <div>Название комнаты:</div>
                <input type="text" value={nameRoom} onChange={e => setNameRoom(e.target.value)}/>
                <button className="createRoom__btn btn" onClick={handleCreateRoom}>Создать комнату</button>
            </div>

        </div>)
}

export default CreateRoom;