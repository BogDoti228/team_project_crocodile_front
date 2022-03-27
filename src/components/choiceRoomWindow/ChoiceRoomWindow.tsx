import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import style from './choiceRoomWindow.module.scss';



function ChoiceRoomWindow({setOpen}: choiceRoomWindowProps){
    return (
        <div className={style.window_container}>
            <div className={style.window}>
                <JoinRoom setOpen={setOpen}/>
                <CreateRoom setOpen={setOpen}/>
            </div>
        </div>
    )
}

export default ChoiceRoomWindow;