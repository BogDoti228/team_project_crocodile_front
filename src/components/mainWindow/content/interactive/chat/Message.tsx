import React, {useEffect, useState} from "react";
import style from "./message.module.scss";
import {sendChangeMessage, MessageType} from "../../../../../store/web-slices/chat_slice";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {useSelector} from "react-redux";
import {NICK_IN_STORAGE} from "../../../../enterWindow/Enter";
import {GameBooleansType, postGameProcessInfo} from "../../../../../store/web-slices/game_process_slice";
import {setIsWordGuessed} from "../../../../../store/web-slices/role_slice";

const Message : React.FC<MessageType> = ({id,name, text, status}) => {
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const [visibleBtn, setVisibleBtn] = useState(false);
    const dispatch = useTypeDispatch();
    let messageColor = style.neutral;

    useEffect(() => {
        setVisibleBtn(currentStartUser === sessionStorage.getItem(NICK_IN_STORAGE));
    }, [currentStartUser])

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
        case "right":
            messageColor = style.right;
    }

    const onGameEnd = () => {
        dispatch(postGameProcessInfo('betweenRound'));
        dispatch(setIsWordGuessed(true));
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

    const handleRight = () => {
        if (status === "right")
            dispatch(sendChangeMessage({id, name, text, status: "neutral"}))
        else
        {
            onGameEnd()
            dispatch(sendChangeMessage({id, name, text, status: "right"}))
        }
    }

    return (<div  className={style.message}>
        <div className={style.name}>{name}: </div>
        <div className={style.text + ' ' + messageColor}>{text}</div>
        {visibleBtn && <button className={`${style.button} ${style.buttonDislike}`}  onClick={handleDislike}>no</button>}
        {visibleBtn && <button className={`${style.button} ${style.buttonLike}`} onClick={handleLike}>yes</button>}
        {visibleBtn && <button className={`${style.button} ${style.buttonRightAnswer}`} onClick={handleRight}>right</button> }
    </div>)
}

export default Message;