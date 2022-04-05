import React from "react";
import style from "./message.module.scss";
import {sendChangeMessage, MessageType} from "../../../../../store/web-slices/chat_slice";
import {useTypeDispatch} from "../../../../../store/store";

const Message : React.FC<MessageType> = ({id,name, text, status}) => {
    const dispatch = useTypeDispatch();

    let messageColor = style.neutral;
    switch (status){
        case "negative":
            messageColor = style.negative;
            break;
        case "neutral":
            messageColor = style.neutral;
            break;
        case "positive":
            messageColor = style.positive;
            break;
    }

    const handleDislike = () => {
        if (status === 'negative')
            dispatch(sendChangeMessage({id, name, text, status: "neutral"}))
        else
            dispatch(sendChangeMessage({id, name, text, status: "negative"}))
    }

    const handleLike = () => {
        if (status === "positive")
            dispatch(sendChangeMessage({id, name, text, status: "neutral"}))
        else
            dispatch(sendChangeMessage({id, name, text, status: "positive"}))
    }

    return (<div  className={style.message}>
        <div className={style.name}>{name}: </div>
        <div className={style.text + ' ' + messageColor}>{text}</div>
        <button className={style.button + ' ' + style.buttonDislike} onClick={handleDislike}>no</button>
        <button className={style.button + ' ' + style.buttonLike} onClick={handleLike}>yes</button>
    </div>)
}

export default Message;