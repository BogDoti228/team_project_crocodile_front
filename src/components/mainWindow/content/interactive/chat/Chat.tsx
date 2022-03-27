import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useTypeDispatch} from "../../../../../store/store";
import {getName} from "../../../../../store/web-slices/profile_slice";

const Chat : React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const [listMessage, setListMessage] = useState<Array<string>>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    const {name} = useSelector((state : RootState) => state.profileReducer)


    const dispatch = useTypeDispatch();


    useEffect(() => {
        if (ulRef.current){
            ulRef.current.scrollTop = ulRef.current.scrollHeight
        }
    }, [listMessage])

    const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setMessage(val)
    }

    const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (message.length === 0) return;
            setListMessage([...listMessage, message])
            setMessage('');
            if (inputRef.current)
                inputRef.current.value = ""
            dispatch(getName())
        }
    }

    return (
        <div className={"chat"}>
            <ul className={"chat__window"} ref={ulRef}>
                {listMessage.map((x, index) => <li className={"message"} key={index}>
                    <span className={"message__name"} style={{color : "red"}}>{name}: </span>
                    {x}
                </li>)}
            </ul>
            <div className={"chat__button"}>
                <input ref={inputRef} placeholder={"Написать сообщение..."} className={"chat__sender"} type="text" onKeyPress={(e) => sendMessage(e)} onChange={(e) => getMessage(e)}/>
            </div>
        </div>
    )
}

export default Chat