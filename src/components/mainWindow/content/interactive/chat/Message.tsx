import React from "react";
import style from "./message.module.scss";

type MessageProps = {
    name: string,
    text: string,
}

const Message : React.FC<MessageProps> = ({name, text}) => {
    return (<div  className={style.message} >
        <div className={style.name}>{name}: </div>
        <div className={style.text}>{text}</div>
        <button className={style.button + ' ' + style.buttonDislike}>хрень</button>
        <button className={style.button + ' ' + style.buttonLike}>збс</button>

    </div>)
}

export default Message;