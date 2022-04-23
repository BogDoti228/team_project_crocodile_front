import React, {useEffect} from "react";
import style from "./roomInfo.module.scss";
import UserList from "./userList/UserList";
import BoxWord from "./boxWord/BoxWord";
import Timer from "./timer/Timer";


const RoomInfo : React.FC = () => {
    return (
        <div className={style.room_info}>
            <UserList/>
            <div className={style.timer_box_word_wrapper}>
                <BoxWord/>
                <Timer/>
            </div>
        </div>
    )
}

export default RoomInfo