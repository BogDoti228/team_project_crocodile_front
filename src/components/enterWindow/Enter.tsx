import React, {useState} from "react";
import {useTypeDispatch} from "../../store/store";
import {postName, setName} from "../../store/web-slices/profile_slice";
import style from "./enterWindow.module.scss";
import {useNavigate} from "react-router-dom";

function Enter() {
    const [nick, setNick] = useState('');
    const [isErrorMaxLen, setIsErrorMaxLenMaxLen] = useState(false);
    const [isErrorZeroInput, setIsErrorZeroInput] = useState(false);
    const dispatch = useTypeDispatch();

    const onChangeInput = (value: string) => {
        setIsErrorZeroInput(false);
        if (value.length > 15) {
            setIsErrorMaxLenMaxLen(true);
        } else {
            setIsErrorMaxLenMaxLen(false);
            setNick(value);
        }
    }

    let navigate = useNavigate();

    const handleClickBtn = () => {
        if (nick.length === 0) {
            setIsErrorZeroInput(true);
            return;
        }
        dispatch(setName(nick));
        dispatch(postName(nick));
        navigate('/game');
        localStorage.setItem("name", nick);
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            handleClickBtn();
        }
    }

    return (
        <div className={style.enter}>
            {isErrorMaxLen && <div className={style.errorMessage}>Слишком длинный ник</div>}
            {isErrorZeroInput && <div className={style.errorMessage}>Пустой ник</div>}
            <input placeholder="Введите свой ник"
                   className={style.input + " input"}
                   type="text"
                   value={nick}
                   onChange={(e) => {
                       onChangeInput(e.target.value)
                   }}
                   onKeyPress={e => {
                       handlePressEnter(e)
                   }}
            />
            <button className={style.btn + " btn"} onClick={handleClickBtn}>Войти</button>
        </div>
    )
}

export default Enter;