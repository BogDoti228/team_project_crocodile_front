import React, {useEffect} from "react";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getUsersList} from "../../../../../store/web-slices/list_users_slice";
import {useSelector} from "react-redux";
import style from "./roomInfo.module.scss";
import {ROOM_ID_IN_STORAGE} from "../../../../../store/web-slices/chat_slice";
import {exec} from "child_process";

const RoomInfo : React.FC = () => {
    const dispatch = useTypeDispatch();
    const {usersList} = useSelector((state : RootState) => state.usersListReducer)

    useEffect(() => {
        dispatch(getUsersList())

        /*setInterval(() => {
            dispatch(getUsersList())
        }, 1000)*/
    },[])

    const handleCopyToClipboard = () => {
        let text = sessionStorage.getItem(ROOM_ID_IN_STORAGE);
        if (text)
            navigator.clipboard.writeText(text)
                .catch(console.log);
    }

    return (
        <div className={style.room_info}>
            <div className={style.box_word} onClick={handleCopyToClipboard}>ID: {sessionStorage.getItem(ROOM_ID_IN_STORAGE)}</div>
        </div>
    )
}

export default RoomInfo