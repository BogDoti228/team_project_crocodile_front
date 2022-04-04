import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import style from './choiceRoomWindow.module.scss';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useEffect} from "react";


function ChoiceRoomWindow() {

    let navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    })

    return (
        <div className={style.window_container}>
            <div className={style.window}>
                <JoinRoom/>
                <CreateRoom/>
            </div>
        </div>
    )
}

export default ChoiceRoomWindow;