import {useState} from "react";

function CreateRoom({setOpen}: choiceRoomWindowProps){

    const [nameRoom, setNameRoom] = useState('');

    const handleCreateRoom = () =>{
        setOpen(v => !v);
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