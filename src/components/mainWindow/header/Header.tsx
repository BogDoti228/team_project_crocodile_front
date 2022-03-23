import React, {useEffect, useState} from "react";
import logo from "../../../resources/images/logo.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";



const Header : React.FC = () => {
    const {name} = useSelector((state : RootState) => state.profileReducer)

    return (
        <header className={"header"}>
            <div className={"header__title-box"}>
                <img className={"header__title-box__logo"} src={logo} alt="crocodile"/>
                <h1 className={"header__title-box__title"}>AlligatorZ</h1>
            </div>
            <div className={"header__profile"}>
                {name}
            </div>
        </header>
    )
}

export default Header