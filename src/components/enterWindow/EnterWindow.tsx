import React from "react";
import Enter from "./Enter";
import Info from "./Info";

function EnterWindow({setOpen}: propsEnterWindow){
    return (
        <div>
            <Enter setOpen={setOpen}/>
            <Info/>
        </div>
    )
}

export default EnterWindow