import React, {useEffect} from "react";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getUsersList} from "../../../../../store/web-slices/list_users_slice";
import {useSelector} from "react-redux";
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