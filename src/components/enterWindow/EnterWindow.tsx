import React from "react";
import Enter from "./Enter";
import Info from "./Info";
import style from "./enterWindow.module.scss";

function EnterWindow({setAuth}: propsEnterWindow){
    return (
        <div className={style.window}>
            <div className={style.window_content}>
                <Enter setAuth={setAuth} />
                <Info/>
            </div>

        </div>
    )
}

export default EnterWindow