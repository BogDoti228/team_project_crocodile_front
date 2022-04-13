import React, {useEffect} from "react";
import Enter from "./Enter";
import Info from "./Info";
import style from "./enterWindow.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";

function EnterWindow(){
    const navigate = useNavigate();
    const {isAuth} = useSelector((state: RootState) => state.profileReducer);
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    })
    return (
        <div className={style.window}>
            <div className={style.window_content}>
                <Enter/>
                <Info/>
            </div>
        </div>
    )
}

export default EnterWindow