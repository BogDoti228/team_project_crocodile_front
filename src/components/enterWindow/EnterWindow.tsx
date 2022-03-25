import React from "react";
import Enter from "./Enter";
import Info from "./Info";

function EnterWindow({setAuth}: propsEnterWindow){
    return (
        <div className="enter-window">
            <div className="enter-window__content">
                <Enter setAuth={setAuth} />
                <Info/>
            </div>

        </div>
    )
}

export default EnterWindow