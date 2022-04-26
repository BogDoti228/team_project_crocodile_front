import React from "react";
import RoomInfo from "./roomInfo/RoomInfo";
import Chat from "./chat/Chat";
import style from "./interactive.module.scss";

const Interactive: React.FC = () => {
  return (
    <div className={style.interactive}>
      <RoomInfo />
      <Chat />
    </div>
  );
};

export default Interactive;
