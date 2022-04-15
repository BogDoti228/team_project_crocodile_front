import React, {useEffect} from "react";
import style from "./roomInfo.module.scss";
import UserList from "./userList/UserList";
import BoxWord from "./boxWord/BoxWord";
import Timer from "./timer/Timer";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getPreStartInfo} from "../../../../../store/web-slices/select_slice";

const RoomInfo : React.FC = () => {
    const {isAdmin} = useSelector((state : RootState) => state.roleReducer)

    const dispatch = useTypeDispatch();

    useEffect(() => {
        if (!isAdmin) {
            dispatch(getPreStartInfo())

            const idInterval = setInterval(() => {
                dispatch(getPreStartInfo())
            }, 1000)

            return () => {
                clearInterval(idInterval)
            }
        }
    },[])

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