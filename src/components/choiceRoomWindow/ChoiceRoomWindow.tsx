import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import style from "./choiceRoomWindow.module.scss";

function ChoiceRoomWindow() {
  return (
    <div className={style.window_container}>
      <div className={style.window}>
        <JoinRoom />
        <CreateRoom />
      </div>
    </div>
  );
}

export default ChoiceRoomWindow;
