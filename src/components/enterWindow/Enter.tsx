import React, {useState} from "react";
import {useTypeDispatch} from "../../store/store";
import {postName, setName} from "../../store/web-slices/profile_slice";
import {json} from "stream/consumers";

function Enter({setOpen}: propsEnterWindow){
    const [nick, setNick] = useState('');
    const [isErrorMaxLen, setIsErrorMaxLenMaxLen] = useState(false);
    const [isErrorZeroInput, setIsErrorZeroInput] = useState(false);
    const dispatch = useTypeDispatch();

    const onChangeInput = (value: string) => {
        setIsErrorZeroInput(false);
        if (value.length > 15){
            setIsErrorMaxLenMaxLen(true);
        }else {
            setIsErrorMaxLenMaxLen(false);
            setNick(value);
        }
    }

    const handleClickBtn = () => {
        if (nick.length === 0){
            setIsErrorZeroInput(true);
            return;
        }
        setOpen(v => !v );
        dispatch(postName(nick))
    }

    const handlePressEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleClickBtn();
    }

    let user = {
        Name: "kek",
    }

    const post = () => {
        fetch("https://localhost:8080/main/post",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
    }

    return (
        <div className="enter-window__enter">
            {isErrorMaxLen && <div className="enter-window__error-message">Слишком длинный ник</div>}
            {isErrorZeroInput && <div className="enter-window__error-message">Пустой ник</div>}
            <input placeholder="Введите свой ник"
                   className="enter-window__input"
                   type="text"
                   value={nick}
                   onChange={(e) => {onChangeInput(e.target.value)}}
                   onKeyPress={e => {handlePressEnter(e)}}
            />
            <button className="enter-window__btn btn" onClick={handleClickBtn}>Войти</button>
            <button className="enter-window__btn btn" onClick={post}>POST</button>
        </div>
    )
}

export default Enter;