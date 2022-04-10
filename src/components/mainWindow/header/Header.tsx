import React, {useEffect, useState} from "react";
import logo from "../../../resources/images/logo.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import style from './header.module.scss';
import AdminMenu from "./AdminMenu/AdminMenu";
import {ROOM_ID_IN_STORAGE} from "../../../store/web-slices/chat_slice";




const Header : React.FC = () => {
    const {name} = useSelector((state : RootState) => state.profileReducer)
    const {isAdmin} = useSelector((state : RootState) => state.roleReducer)
    const handleCopyToClipboard = () => {
        let text = sessionStorage.getItem(ROOM_ID_IN_STORAGE);
        if (text)
            navigator.clipboard.writeText(text)
                .catch(console.log);
    }

    return (
        <header className={style.header}>
            <div className={style.titleBox}>
                <img className={style.logo} src={logo} alt="crocodile"/>
                    <h1 className={style.title}>AlligatorZ</h1>
            </div>
            {isAdmin && <AdminMenu/>}
            <div>
                <div className={style.room_info}>
                    <div className={style.box_word} onClick={handleCopyToClipboard}>ID: {sessionStorage.getItem(ROOM_ID_IN_STORAGE)}</div>
                </div>
                <div className={style.profile}>
                    {name}
                </div>
            </div>
        </header>
    )
}

export default Header