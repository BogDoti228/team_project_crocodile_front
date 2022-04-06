import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getStoryMessage, sendMessage} from "../../../../../store/web-slices/chat_slice";
import style from "./chat.module.scss";
import Message from "./Message";

const Chat : React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    const {messages} = useSelector((state : RootState) => state.chatReducer)

    const dispatch = useTypeDispatch()

    useEffect(() => {
        if (ulRef.current){
            ulRef.current.scrollTop = ulRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        //dispatch(getStoryMessage());
    }, [])

    const applyMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (message.length === 0) return;

            await Promise.resolve().then(() => {
                dispatch(sendMessage(message))
            })

            setMessage('');
            if (inputRef.current)
                inputRef.current.value = ""
        }
    }

    return (
        <div className={style.chat}>
            <ul className={style.window} ref={ulRef}>
                {messages.map((message, index) =>
                    <li key={index}>
                    <Message name={message.name} text={message.text} status={message.status} id={message.id}/>
                    </li>
                )}
            </ul>
            <div className={style.inputBox}>
                <input ref={inputRef}
                       placeholder={"Написать сообщение..."}
                       className={style.input} type="text"
                       onKeyPress={(e) => applyMessage(e)}
                       onChange={e => setMessage(e.target.value)}/>
                <button className={style.button}>1</button>
            </div>
        </div>
    )
}

export default Chat