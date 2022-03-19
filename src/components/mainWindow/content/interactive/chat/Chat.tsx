import React, {useEffect, useRef, useState} from "react";

const Chat : React.FC<ProfileProps> = ({name}) => {
    const [message, setMessage] = useState<string>("")
    const [listMessage, setListMessage] = useState<Array<string>>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement>(null)

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
            setListMessage([...listMessage, message])
            if (inputRef.current)
                inputRef.current.value = ""
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