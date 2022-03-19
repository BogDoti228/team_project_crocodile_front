import React from "react";
import RoomInfo from "./roomInfo/RoomInfo";
import Chat from "./chat/Chat";

const Interactive : React.FC = () => {
    return (
        <div className={"interactive unselectable"}>
            <RoomInfo/>
            <Chat/>
        </div>
    )
}

export default Interactive