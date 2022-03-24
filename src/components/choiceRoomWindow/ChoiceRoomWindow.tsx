import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import "./choiceRoomWindow.css";

function ChoiceRoomWindow(){
    return (
        <div className="choiceWindow-container">
            <div className="choiceWindow">
                <JoinRoom/>
                <CreateRoom/>
            </div>
        </div>
    )
}

export default ChoiceRoomWindow;