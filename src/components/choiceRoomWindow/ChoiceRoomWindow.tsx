import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import "./choiceRoomWindow.css";



function ChoiceRoomWindow({setOpen}: choiceRoomWindowProps){
    return (
        <div className="choiceWindow-container">
            <div className="choiceWindow">
                <JoinRoom setOpen={setOpen}/>
                <CreateRoom setOpen={setOpen}/>
            </div>
        </div>
    )
}

export default ChoiceRoomWindow;