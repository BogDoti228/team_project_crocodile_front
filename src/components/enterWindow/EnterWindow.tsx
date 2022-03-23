import React from "react";
import Enter from "./Enter";
import Info from "./Info";

function EnterWindow({setOpen}: propsEnterWindow){
    return (
        <div className="enter-window">
            <div className="enter-window__content">
                <Enter setOpen={setOpen} />
                <Info/>
            </div>

        </div>
    )
}

export default EnterWindow