import React from "react";
import Enter from "./Enter";
import Info from "./Info";

function EnterWindow({setOpen, setDataInput}: propsEnterWindow){
    return (
        <div className="enter-window">
            <div className="enter-window__content">
                <Enter setOpen={setOpen} setDataInput={setDataInput}/>
                <Info/>
            </div>

        </div>
    )
}

export default EnterWindow