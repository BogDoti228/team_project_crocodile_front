import React, {useEffect, useState} from "react";
import logo from "../../../resources/images/logo.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import style from './header.module.scss';



const Header : React.FC = () => {
    const {name} = useSelector((state : RootState) => state.profileReducer)

    return (
        <header className={style.header}>
            <div className={style.titleBox}>
                <img className={style.logo} src={logo} alt="crocodile"/>
                    <h1 className={style.title}>AlligatorZ</h1>
            </div>
            <div className={style.profile}>
                {name}
            </div>
        </header>
    )
}

export default Header