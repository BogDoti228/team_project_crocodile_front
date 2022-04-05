import React from "react";
import Enter from "./Enter";
import Info from "./Info";
import style from "./enterWindow.module.scss";

function EnterWindow(){
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