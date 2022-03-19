import React from "react";
import RoomInfo from "./roomInfo/RoomInfo";
import Chat from "./chat/Chat";

const Interactive : React.FC<ProfileProps> = ({name}) => {
    return (
        <div className={"interactive unselectable"}>
            <RoomInfo/>
            <Chat name={name}/>
        </div>
    )
}

export default Interactive