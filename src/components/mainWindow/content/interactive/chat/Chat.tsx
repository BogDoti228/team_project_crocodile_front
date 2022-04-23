import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {clearChat, getStoryMessage, sendMessage} from "../../../../../store/web-slices/chat_slice";
import style from "./chat.module.scss";
import Message from "./Message";

const Chat : React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const [styleInput, setStyleInput] = useState(style.chat);
    const inputRef = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    const {messages} = useSelector((state : RootState) => state.chatReducer)
    const {currentStartUser} = useSelector((state : RootState) => state.selectReducer)
    const {gameState} = useSelector((state: RootState) => state.gameProcessReducer)
    const {name} = useSelector((state : RootState) => state.profileReducer)

    const dispatch = useTypeDispatch()

    useEffect(() => {
        if (ulRef.current){
            ulRef.current.scrollTop = ulRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        dispatch(getStoryMessage());
    }, [])

    useEffect(() => {
        if (gameState === 'during' && currentStartUser !== name){
            setStyleInput(style.inputBox)
        }
        else{
            setStyleInput(style.inputBox + ' ' + style.nonActive)
        }
    }, [gameState, currentStartUser])

    useEffect(() => {
        dispatch(clearChat());
    }, [gameState])

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
            <div className={styleInput}>
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