import React from "react";
import style from "./roomInfo.module.scss";
import UserList from "./userList/UserList";
import BoxWord from "./boxWord/BoxWord";
import Timer from "./timer/Timer";
import Score from "./score/Score";

const RoomInfo: React.FC = () => {
  return (
    <div className={style.room_info}>
      <UserList />
      <div className={style.pre_start_info_wrap}>
        <BoxWord />
        <div className={style.bottom_items_wrap}>
          <Timer />
          <Score />
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
