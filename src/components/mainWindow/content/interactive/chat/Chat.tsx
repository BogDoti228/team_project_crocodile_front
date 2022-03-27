import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getStoryMessage, sendMessage} from "../../../../../store/web-slices/chat_slice";
import style from "./chat.module.scss";
import Message from "./Message";

const Chat : React.FC = () => {
    const [message, setMessage] = useState<string>("")
    /*const [listMessage, setListMessage] = useState<Array<string>>([])*/
    const inputRef = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    const {name} = useSelector((state : RootState) => state.profileReducer)
    const {messages} = useSelector((state : RootState) => state.chatReducer)

    const dispatch = useTypeDispatch()

    useEffect(() => {
        if (ulRef.current){
            ulRef.current.scrollTop = ulRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
      setInterval(() => {
          dispatch(getStoryMessage())
      }, 100)
    }, [])

    const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setMessage(val)
    }

    const applyMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (message.length === 0) return;

            await Promise.resolve().then(() => {
                dispatch(sendMessage(message))
            }).then(() => {
                dispatch(getStoryMessage())
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
                    <Message name={message.Name} text={message.Text} />
                    </li>
                )}
            </ul>
            <div className={style.inputBox}>
                <input ref={inputRef} placeholder={"Написать сообщение..."} className={style.input} type="text" onKeyPress={(e) => applyMessage(e)} onChange={(e) => getMessage(e)}/>
                <button className={style.button}>1</button>
            </div>
        </div>
    )
}

export default Chat